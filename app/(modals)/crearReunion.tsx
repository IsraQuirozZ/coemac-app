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
  { name: "Carlos López", company: "Innovatech" },
  { name: "Elena García", company: "Digital Minds" },
  { name: "Fernando Ruiz", company: "Future Systems" },
  { name: "Isabel Sánchez", company: "NetWorks Inc" },
  { name: "Javier Torres", company: "Cloud Dynamics" },
  { name: "Laura Fernández", company: "Smart Ventures" },
  { name: "Miguel Herrera", company: "Data Solutions" },
];

export default function CrearReunion() {
  // TOAST
  const { showToast } = useToast();

  // MODALS (SELECT & DATEPICKER)
  const [date, setDate] = useState(new Date());
  const dateSheetRef = useRef<BottomSheet>(null);
  const memberSheetRef = useRef<BottomSheet>(null);

  const [isAnySheetOpen, setIsAnySheetOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !isAnySheetOpen,
    });
  }, [isAnySheetOpen]);

  const router = useRouter();

  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Simulación de envío de formulario
  const [form, setForm] = useState({
    miembro: null as string | null,
    fechaReunion: date,
    temasTratados: "",
  });

  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    miembro: "",
    fechaReunion: "",
    temasTratados: "",
  });

  const validateForm = () => {
    let newErrors: any = {};

    const fechaReunion = form.fechaReunion;
    const today = new Date();
    const temasTratados = form.temasTratados.trim();

    const textRegex = /^.{10,}$/;

    // MIEMBRO
    if (!form.miembro) {
      newErrors.miembro = "Selecciona un miembro";
    }

    // FECHA
    if (!fechaReunion) {
      newErrors.fechaReunion = "La fecha de la reunión es requerida.";
    } else if (fechaReunion > today) {
      newErrors.fechaReunion = "La fecha de la reunión no puede ser futura.";
    }

    // TEMAS TRATADOS
    if (temasTratados && !textRegex.test(temasTratados)) {
      newErrors.temasTratados =
        "Escribe al menos 10 caracteres para los temas tratados.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = () => {
    // TODO: prisma.reunion.create({ data: { miembro: selectedMember, fecha: date, temas } })
    const isValid = validateForm();

    if (!isValid) {
      setIsError(true);
      return;
    }

    console.log("Formulario válido", form);
    showToast("Reunión registrada", "success");

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
          <Text style={globalStyles.containerTitle}>Registra una reunión</Text>
          <Text style={globalStyles.containerDescription}>
            Registra la reunión que tuviste con algún miembro.
          </Text>
        </View>
        <View style={globalStyles.formFields}>
          {/* ── Reunión con (member picker) ── */}

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

          {/* ── Fecha de reunión ── */}
          <FormField
            label="Fecha de la reunión"
            icon="calendar-clear"
            error={errors.fechaReunion}
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

          {/* ── Temas tratados ── */}
          <FormField
            label="Temas tratados"
            icon="reader"
            error={errors.temasTratados}
          >
            <TextInput
              placeholder="Tu texto aquí..."
              placeholderTextColor={colors.secondaryText}
              multiline
              numberOfLines={4}
              style={globalStyles.textArea}
              value={form.temasTratados}
              onChangeText={(text) => {
                setForm({ ...form, temasTratados: text });
                clearError("temasTratados");
              }}
            />
          </FormField>
        </View>
        {isError && (
          <Text style={{ color: colors.error, textAlign: "center" }}>
            Por favor, solucione los errores antes de enviar.
          </Text>
        )}
        <Button
          label="Registrar Reunión"
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
            fechaReunion: selectedDate,
          }));
          clearError("fechaReunion");
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />
    </View>
  );
}
