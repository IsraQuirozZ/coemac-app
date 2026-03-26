import Button from "@/components/ui/Button";
import { DatePickerSheet } from "@/components/ui/DatePickerSheet";
import FormField from "@/components/ui/FormField";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { MemberSelectSheet } from "@/components/ui/MemberSelectSheet";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "../../hooks/useToast";

// TODO: Replace with → prisma.miembro.findMany()
const memberOptions = [
  { name: "Ana Martínez", company: "Tech Solutions" },
  { name: "Carlos López", company: "Digital Pro" },
  { name: "Elena García", company: "Innovation Labs" },
  { name: "Fernando Ruiz", company: "Creative Agency" },
  { name: "Isabel Sánchez", company: "Business Consulting" },
  { name: "Javier Torres", company: "Market Leaders" },
  { name: "Laura Fernández", company: "Design Studio" },
  { name: "Miguel Herrera", company: "Tech Ventures" },
];

export default function CrearAgradecimiento() {
  const memberSheetRef = useRef<BottomSheet>(null);
  const dateSheetRef = useRef<BottomSheet>(null);
  const [isAnySheetOpen, setIsAnySheetOpen] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const { showToast } = useToast();

  // Deshabilitar swipe-to-close del modal padre cuando un sheet está abierto
  useEffect(() => {
    navigation.setOptions({ gestureEnabled: !isAnySheetOpen });
  }, [isAnySheetOpen]);

  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());

  const [form, setForm] = useState({
    miembro: null as string | null,
    contactoReferido: "",
    importe: "",
    fechaNegocio: new Date(),
  });

  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    miembro: "",
    contactoReferido: "",
    importe: "",
    fechaNegocio: "",
  });

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    const nombre = form.contactoReferido.trim();
    const importe = form.importe.trim();
    const today = new Date();

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const importeRegex = /^\d+([.,]\d{1,2})?$/;

    // MIEMBRO
    if (!form.miembro) {
      newErrors.miembro = "Debe seleccionar un miembro.";
    }

    // CONTACTO REFERIDO
    if (!nombre) {
      newErrors.contactoReferido = "El nombre del contacto es requerido.";
    } else if (nombre.length < 3) {
      newErrors.contactoReferido =
        "El nombre debe tener al menos 3 caracteres.";
    } else if (!nombreRegex.test(nombre)) {
      newErrors.contactoReferido =
        "El nombre solo puede contener letras y espacios.";
    }

    // IMPORTE
    if (!importe) {
      newErrors.importe = "El importe del negocio es requerido.";
    } else if (!importeRegex.test(importe)) {
      newErrors.importe = "Introduce un importe válido (ej: 1500 o 1500,00).";
    } else if (parseFloat(importe.replace(",", ".")) <= 0) {
      newErrors.importe = "El importe debe ser mayor que 0.";
    }

    // FECHA
    if (!form.fechaNegocio) {
      newErrors.fechaNegocio = "La fecha del negocio es requerida.";
    } else if (form.fechaNegocio > today) {
      newErrors.fechaNegocio = "La fecha del negocio no puede ser futura.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) {
      setIsError(true);
      return;
    }
    // TODO: prisma.agradecimiento.create({ data: { ...form } })
    showToast("Agradecimiento registrado", "success");
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
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>
            Gracias Negocio Cerrado
          </Text>
          <Text style={globalStyles.containerDescription}>
            Agradece por el negocio que has cerrado con el contacto referido.
          </Text>
        </View>

        <View style={globalStyles.formFields}>
          {/* ── Gracias a (MemberSelectSheet) ── */}
          <FormField label="Gracias a" icon="megaphone" error={errors.miembro}>
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
                  {selectedMember || "Selecciona a un miembro"}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={colors.secondaryText}
                />
              </View>
            </TouchableOpacity>
          </FormField>

          {/* ── Contacto referido ── */}
          <FormField
            label="Por la referencia de (contacto)"
            icon="person-sharp"
            error={errors.contactoReferido}
          >
            <TextInput
              placeholder="Nombre del contacto referido"
              placeholderTextColor={colors.secondaryText}
              value={form.contactoReferido}
              onChangeText={(text) => {
                setForm({ ...form, contactoReferido: text });
                clearError("contactoReferido");
              }}
            />
          </FormField>

          {/* ── Importe del negocio ── */}
          <FormField
            label="Importe del negocio (€)"
            icon="logo-usd"
            error={errors.importe}
          >
            <TextInput
              placeholder="0.00"
              placeholderTextColor={colors.secondaryText}
              keyboardType="decimal-pad"
              value={form.importe}
              onChangeText={(text) => {
                setForm({ ...form, importe: text });
                clearError("importe");
              }}
            />
          </FormField>

          {/* ── Fecha del negocio (DatePickerSheet) ── */}
          <FormField
            label="Fecha del negocio cerrado"
            icon="calendar-clear"
            error={errors.fechaNegocio}
          >
            <TouchableOpacity
              onPress={() => dateSheetRef.current?.snapToIndex(0)}
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
        </View>

        {isError && (
          <Text style={{ color: colors.error, textAlign: "center" }}>
            Por favor, solucione los errores antes de enviar.
          </Text>
        )}

        <Button
          label="Enviar Agradecimiento"
          variant="primary"
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>

      {/* ── MemberSelectSheet ── */}
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

      {/* ── DatePickerSheet ── */}
      <DatePickerSheet
        ref={dateSheetRef}
        value={date}
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setForm((prev) => ({ ...prev, fechaNegocio: selectedDate }));
          clearError("fechaNegocio");
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />
    </View>
  );
}
