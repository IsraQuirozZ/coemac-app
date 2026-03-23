import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import {
  bottomSheetStyles,
  crearReferenciaStyles as styles,
} from "@/styles/crearReferencia";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "../../hooks/useToast";

export default function CrearReferencia() {
  // MODAL MIEMBROS
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "60%"], []);

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.4}
      pressBehavior="close"
    />
  );

  const { showToast } = useToast();
  const [tipo, setTipo] = useState<"interna" | "externa">("interna");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const router = useRouter();
  const memberOptions = [
    "Ana Martínez",
    "Carlos Pérez",
    "Luisa Gómez",
    "Daniel Rivera",
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
      showToast("Corrige los errores antes de continuar", "error");
      setIsError(true);
      return;
    }
    console.log("Formulario válido", form);
    showToast("Referencia registrada", "success");

    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.referenciasContainer}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        enableOnAndroid={true}
      >
        <View style={styles.referenciasText}>
          <Text style={styles.referenciasTitle}>Registra una referencia</Text>
          <Text style={styles.referenciasDescription}>
            Referencia un contacto a un miembro de Coemac para que pueda
            ayudarlo a resolver su problema.
          </Text>
        </View>
        <View style={styles.formContainer}>
          {/* PARA QUIEN ES LA REFERENCIA */}
          <FormField
            label="Referencia para"
            icon="megaphone"
            error={errors.miembro}
          >
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.snapToIndex(0)}
            >
              <View style={styles.formSelectContainer}>
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
            date={true}
            error={errors.fechaReferencia}
          >
            <View>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(_, selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);

                    setForm((prev) => ({
                      ...prev,
                      fechaReferencia: selectedDate,
                    }));

                    if (errors.fechaReferencia) {
                      setErrors((prev) => ({ ...prev, fechaReferencia: "" }));
                    }
                  }
                }}
              />

              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={{ color: colors.light, textAlign: "right" }}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </FormField>

          {/* DESCRIPCION DE LA REFERENCIA */}
          <FormField
            label="Descripción de la referencia"
            icon="reader"
            error={errors.descripcionReferencia}
          >
            <TextInput
              placeholderTextColor={colors.secondaryText}
              placeholder="Describe la referencia..."
              multiline
              numberOfLines={4}
              style={styles.textArea}
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
      {/* MODAL DE MIEMBROS */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={bottomSheetStyles.background}
        handleIndicatorStyle={bottomSheetStyles.handleIndicator}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
        maxDynamicContentSize={500}
      >
        <BottomSheetScrollView
          contentContainerStyle={bottomSheetStyles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={bottomSheetStyles.title}>Selecciona un miembro</Text>

          {memberOptions.map((member) => {
            const isSelected = selectedMember === member;

            return (
              <TouchableOpacity
                key={member}
                onPress={() => {
                  setSelectedMember(member);
                  setForm((prev) => ({ ...prev, miembro: member }));
                  clearError("miembro");
                  bottomSheetRef.current?.close();
                }}
                style={[
                  bottomSheetStyles.item as any,
                  isSelected && bottomSheetStyles.itemSelected,
                ]}
              >
                <Text
                  style={
                    isSelected
                      ? [bottomSheetStyles.text, bottomSheetStyles.textSelected]
                      : bottomSheetStyles.text
                  }
                >
                  {member}
                </Text>

                {isSelected && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
