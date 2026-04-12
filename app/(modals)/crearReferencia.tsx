import Button from "@/components/ui/Button";
import { DatePickerSheet } from "@/components/ui/DatePickerSheet";
import FormField from "@/components/ui/FormField";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { MemberSelectSheet } from "@/components/ui/MemberSelectSheet";
import { crearReferenciaStyles as styles } from "@/styles/crearReferencia";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "../../hooks/useToast";
import { crearReferencia } from "../../services/referenciaService";
import { getUsuarios } from "../../services/usuarioService";

export default function CrearReferencia() {
  const [submitting, setSubmitting] = useState(false);

  // MODAL MIEMBROS
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const memberSheetRef = useRef<BottomSheet>(null);
  const dateSheetRef = useRef<BottomSheet>(null);

  const [isAnySheetOpen, setIsAnySheetOpen] = useState(false);
  const navigation = useNavigation();

  // Cuando Modal (SelectMember, Datepicker) esté abierto, deshabilitar el gesto de swipe para cerrar el modal padre (crear referencia)
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !isAnySheetOpen,
    });
  }, [isAnySheetOpen]);

  // MODAL DATEPICKER
  const [date, setDate] = useState(new Date());

  const { showToast } = useToast();
  const [tipo, setTipo] = useState<"interna" | "externa">("interna");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsuarios();
        setMembers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const memberOptions = members.map((m) => ({
    id: m.id,
    name: `${m.nombre} ${m.apellido}`,
    company: m.empresa || "Sin empresa",
  }));

  const [form, setForm] = useState({
    miembro: null as string | null,
    nombreContacto: "",
    emailContacto: "",
    telefonoContacto: "",
    cargoContacto: "",
    fechaReferencia: date,
    descripcionReferencia: "",
    tipoReferencia: tipo,
  });

  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    miembro: "",
    nombreContacto: "",
    emailContacto: "",
    telefonoContacto: "",
    cargoContacto: "",
    fechaReferencia: "",
    descripcionReferencia: "",
    tipoReferencia: "",
  });

  const validateForm = () => {
    let newErrors: any = {};

    const nombre = form.nombreContacto.trim();
    const email = form.emailContacto.trim();
    const telefono = form.telefonoContacto.trim();
    const cargo = form.cargoContacto.trim();
    const descripcion = form.descripcionReferencia.trim();
    const fechaReferencia = form.fechaReferencia;
    const today = new Date();

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,12}$/;
    const descripcionRegex = /^.{10,}$/;

    // MIEMBRO
    if (!form.miembro) {
      newErrors.miembro = "Debe seleccionar un miembro.";
    }

    // NOMBRE
    if (!nombre) {
      newErrors.nombreContacto = "El nombre del contacto es requerido.";
    } else if (nombre.length < 3) {
      newErrors.nombreContacto = "Debe tener al menos 3 caracteres.";
    } else if (!nombreRegex.test(nombre)) {
      newErrors.nombreContacto = "Solo puede contener letras y espacios.";
    }

    // EMAIL / PHONE (al menos uno requerido)
    if (!email && !telefono) {
      newErrors.emailContacto = "Debe ingresar email o teléfono.";
      newErrors.telefonoContacto = "Debe ingresar email o teléfono.";
    } else {
      if (email && !emailRegex.test(email)) {
        newErrors.emailContacto = "El email del contacto no es válido.";
      }

      if (telefono && !phoneRegex.test(telefono)) {
        newErrors.telefonoContacto = "Debe contener entre 9 y 12 dígitos.";
      }
    }

    // CARGO (OPCIONAL)
    if (cargo && (cargo.length < 3 || cargo.length > 50)) {
      newErrors.cargoContacto =
        "Debe tener entre 3 y 50 caracteres si se proporciona.";
    } else if (cargo && !nombreRegex.test(cargo)) {
      newErrors.cargoContacto = "Solo puede contener letras y espacios.";
    }

    // FECHA
    if (!form.fechaReferencia) {
      newErrors.fechaReferencia = "La fecha de la referencia es requerida.";
    } else if (fechaReferencia > today) {
      newErrors.fechaReferencia =
        "La fecha de la referencia no puede ser futura.";
    }

    // DESCRIPCION
    if (descripcion && !descripcionRegex.test(descripcion)) {
      newErrors.descripcionReferencia =
        "Debe tener al menos 10 caracteres si se proporciona.";
    }

    // TIPO DE REFERENCIA
    if (!form.tipoReferencia) {
      newErrors.tipoReferencia = "Debe seleccionar un tipo.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) {
      setIsError(true);
      return;
    }

    try {
      setSubmitting(true);

      const payload: any = {
        receptorId: form.miembro,
        nombreContacto: form.nombreContacto,
        telefonoContacto: form.telefonoContacto || undefined,
        tipo: form.tipoReferencia === "interna" ? "INTERNA" : "EXTERNA",
      };

      if (form.emailContacto) payload.emailContacto = form.emailContacto;
      if (form.cargoContacto) payload.cargoContacto = form.cargoContacto;
      if (form.descripcionReferencia)
        payload.descripcion = form.descripcionReferencia;
      if (form.fechaReferencia) payload.fechaReferencia = form.fechaReferencia;

      await crearReferencia(payload);

      showToast("Referencia registrada", "success");
      router.back();
    } catch (error: any) {
      showToast(error.message || "Error al crear la referencia", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HandlerIndicator />
      <KeyboardAwareScrollView
        contentContainerStyle={globalStyles.formContainer}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>
            Registra una referencia
          </Text>
          <Text style={globalStyles.containerDescription}>
            Referencia un contacto a un miembro de Coemac para que pueda
            ayudarlo a resolver su problema.
          </Text>
        </View>
        <View style={globalStyles.formFields}>
          {/* PARA QUIEN ES LA REFERENCIA */}
          <FormField
            label="Referencia para"
            icon="megaphone"
            error={errors.miembro}
          >
            <TouchableOpacity
              onPress={() => memberSheetRef.current?.snapToIndex(0)}
            >
              <View style={globalStyles.formSelectContainer}>
                <Text
                  style={{
                    color: selectedMember
                      ? colors.primaryText
                      : colors.secondaryText,
                  }}
                >
                  {selectedMember
                    ? selectedMember.name
                    : "Selecciona un miembro"}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={colors.secondaryText}
                />
              </View>
            </TouchableOpacity>
          </FormField>

          {/* NOMBRE CONTACTO REFERIDO  */}
          <FormField
            label="Contacto referido"
            icon="person-sharp"
            error={errors.nombreContacto}
          >
            <TextInput
              placeholderTextColor={colors.secondaryText}
              placeholder="Nombre del contacto referido"
              value={form.nombreContacto}
              onChangeText={(text) => {
                setForm({ ...form, nombreContacto: text });
                clearError("nombreContacto");
              }}
            />
          </FormField>

          {/* EMAIL CONTACTO REFERIDO */}
          <FormField
            label="Email del contacto"
            icon="mail"
            error={errors.emailContacto}
          >
            <TextInput
              placeholderTextColor={colors.secondaryText}
              placeholder="tucorreo@networking.com"
              value={form.emailContacto}
              onChangeText={(text) => {
                setForm({ ...form, emailContacto: text });
                clearError("emailContacto");
              }}
              autoCapitalize="none"
            />
          </FormField>

          {/* TELEFONO CONTACTO REFERIDO */}
          <FormField
            label="Teléfono del contacto"
            icon="call"
            error={errors.telefonoContacto}
          >
            <TextInput
              placeholderTextColor={colors.secondaryText}
              placeholder="00123456789"
              value={form.telefonoContacto}
              onChangeText={(text) => {
                setForm({ ...form, telefonoContacto: text });
                clearError("telefonoContacto");
              }}
              keyboardType="phone-pad"
            />
          </FormField>

          {/* CARGO DEL CONTACTO */}
          <FormField
            label="Cargo del Contacto"
            icon="briefcase"
            error={errors.cargoContacto}
          >
            <TextInput
              placeholderTextColor={colors.secondaryText}
              placeholder="Cargo del contacto"
              value={form.cargoContacto}
              onChangeText={(text) => {
                setForm({ ...form, cargoContacto: text });
                clearError("cargoContacto");
              }}
            />
          </FormField>

          {/* FECHA DE LA REFERENCIA */}
          <FormField
            label="Fecha de la referencia"
            icon="calendar-clear"
            error={errors.fechaReferencia}
          >
            <TouchableOpacity
              onPress={() => {
                dateSheetRef.current?.snapToIndex(0);
              }}
            >
              <Text>
                {date.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </TouchableOpacity>
          </FormField>

          {/* DESCRIPCION DE LA REFERENCIA */}
          <FormField
            label="Descripción de la referencia"
            icon="reader"
            error={errors.descripcionReferencia}
          >
            <TextInput
              placeholder="Describe la referencia..."
              placeholderTextColor={colors.secondaryText}
              multiline
              numberOfLines={4}
              style={globalStyles.textArea}
              value={form.descripcionReferencia}
              onChangeText={(text) => {
                setForm({ ...form, descripcionReferencia: text });
                clearError("descripcionReferencia");
              }}
            />
          </FormField>

          {/* TIPO DE REFERENCIA */}
          <FormField
            label="Tipo de referencia"
            icon="sync"
            error={errors.tipoReferencia}
          >
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => {
                  setTipo("interna");
                  setForm((prev) => ({ ...prev, tipoReferencia: "interna" }));
                }}
              >
                <View style={styles.radioOuter}>
                  {tipo === "interna" && <View style={styles.radioInner} />}
                </View>
                <Text>Interna</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => {
                  setTipo("externa");
                  setForm((prev) => ({ ...prev, tipoReferencia: "externa" }));
                }}
              >
                <View style={styles.radioOuter}>
                  {tipo === "externa" && <View style={styles.radioInner} />}
                </View>
                <Text>Externa</Text>
              </TouchableOpacity>
            </View>
          </FormField>
        </View>
        {isError && (
          <Text style={{ color: colors.error, textAlign: "center" }}>
            Por favor, solucione los errores antes de enviar.
          </Text>
        )}
        {submitting ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Button
            label={submitting ? "Creando..." : "Crear Referencia"}
            variant="primary"
            onPress={handleSubmit}
            disabled={submitting}
          />
        )}
      </KeyboardAwareScrollView>
      {/* BOTTOM SHEET DE MIEMBROS */}
      <MemberSelectSheet
        ref={memberSheetRef}
        options={memberOptions}
        selected={selectedMember}
        onSelect={(member) => {
          setSelectedMember(member);
          setForm((prev) => ({ ...prev, miembro: member.id }));
          clearError("miembro");
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />

      {/* BOTTOM SHEET DE DATEPICKER */}
      <DatePickerSheet
        ref={dateSheetRef}
        value={date}
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setForm((prev) => ({
            ...prev,
            fechaReferencia: selectedDate,
          }));
          clearError("fechaReferencia");
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />
    </View>
  );
}
