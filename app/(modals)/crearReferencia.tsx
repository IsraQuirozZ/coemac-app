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
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "../../hooks/useToast";

export default function CrearReferencia() {
  // MODAL MIEMBROS
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
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const router = useRouter();
  const memberOptions = [
    { name: "Ana Martínez", company: "Tech Solutions" },
    { name: "Carlos Pérez", company: "Innovate Co" },
    { name: "Luisa Gómez", company: "Digital Partners" },
    { name: "Daniel Rivera", company: "Global Ventures" },
    { name: "Sofía Torres", company: "Future Systems" },
    { name: "Miguel Fernández", company: "Smart Business" },
    { name: "Laura Sánchez", company: "NextGen Inc" },
    { name: "Javier Ruiz", company: "Prime Solutions" },
    { name: "Isabel Díaz", company: "Apex Consulting" },
    { name: "Fernando López", company: "Elite Group" },
  ];

  // Simulación de envío de formulario
  const [form, setForm] = useState({
    miembro: null as string | null,
    nombreContacto: "",
    emailContacto: "",
    telefonoContacto: "",
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
    fechaReferencia: "",
    descripcionReferencia: "",
    tipoReferencia: "",
  });

  const validateForm = () => {
    let newErrors: any = {};

    const nombre = form.nombreContacto.trim();
    const email = form.emailContacto.trim();
    const telefono = form.telefonoContacto.trim();
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
      newErrors.nombreContacto =
        "El nombre del contacto debe tener al menos 3 caracteres.";
    } else if (!nombreRegex.test(nombre)) {
      newErrors.nombreContacto =
        "El nombre del contacto solo puede contener letras y espacios.";
    }

    // EMAIL
    if (!email) {
      newErrors.emailContacto = "El email del contacto es requerido.";
    } else if (!emailRegex.test(email)) {
      newErrors.emailContacto = "El email del contacto no es válido.";
    }

    // PHONE
    if (!telefono) {
      newErrors.telefonoContacto = "El teléfono del contacto es requerido.";
    } else if (!phoneRegex.test(telefono)) {
      newErrors.telefonoContacto =
        "El teléfono del contacto debe contener solo números y tener entre 9 y 12 dígitos.";
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
        "La descripción debe tener al menos 10 caracteres si se proporciona.";
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

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      setIsError(true);
      return;
    }
    console.log("Formulario válido", form);
    showToast("Referencia registrada", "success");

    router.back();
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
                  {selectedMember || "Selecciona un miembro"}
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
        <Button
          label="Crear Referencia"
          variant="primary"
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>
      {/* BOTTOM SHEET DE MIEMBROS */}
      <MemberSelectSheet
        ref={memberSheetRef}
        options={memberOptions}
        selected={
          selectedMember
            ? memberOptions.find((m) => m.name === selectedMember) || null
            : null
        }
        onSelect={(member) => {
          setSelectedMember(member.name);
          setForm((prev) => ({ ...prev, miembro: member.name }));
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
