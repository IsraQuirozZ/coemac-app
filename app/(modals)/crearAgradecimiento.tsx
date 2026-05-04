import Button from "@/components/ui/Button";
import { DatePickerSheet } from "@/components/ui/DatePickerSheet";
import FormField from "@/components/ui/FormField";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import {
  MemberOption,
  MemberSelectSheet,
} from "@/components/ui/MemberSelectSheet";
import { useMembers } from "@/hooks/useMembers";
import { triggerRefresh } from "@/hooks/useRefresh";
import {
  actualizarAgradecimiento,
  crearAgradecimiento,
  getAgradecimientoById,
} from "@/services/agradeciminetoService"; // Asegúrate de tener estas importaciones
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"; // Añadido useLocalSearchParams
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

export default function CrearAgradecimiento() {
  const [submitting, setSubmitting] = useState(false);

  // ── ID DE EDICIÓN ──────────────────────────────────────────────────────────
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;

  // ── Miembros ────────────────────────────────────────────────────────────────
  const { options: memberOptions, loading } = useMembers();
  const [selectedMember, setSelectedMember] = useState<MemberOption | null>(
    null,
  );
  const memberSheetRef = useRef<BottomSheet>(null);
  const dateSheetRef = useRef<BottomSheet>(null);

  const [isAnySheetOpen, setIsAnySheetOpen] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    navigation.setOptions({ gestureEnabled: !isAnySheetOpen });
  }, [isAnySheetOpen]);

  // ── Form state ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    miembro: null as string | null,
    contactoReferido: "",
    importe: "",
    fechaNegocio: new Date(),
  });

  // ── LOAD DATA PARA EDICIÓN ──────────────────────────────────────────────────
  useEffect(() => {
    if (isEditMode) {
      loadAgradecimiento();
    }
  }, [id]);

  const loadAgradecimiento = async () => {
    try {
      setSubmitting(true);
      const data = await getAgradecimientoById(id as string);

      setForm({
        miembro: data.receptorId || null,
        contactoReferido: data.nombreContacto || "",
        importe: data.importe?.toString() || "",
        fechaNegocio: data.fechaNegocio
          ? new Date(data.fechaNegocio)
          : new Date(),
      });
    } catch (error: any) {
      showToast("Error al cargar los datos", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // SINCRONIZAR MIEMBRO
  useEffect(() => {
    if (!form.miembro) return;

    const member = memberOptions.find((m) => m.id === form.miembro);

    if (member) {
      setSelectedMember(member);
    } else {
      setSelectedMember(null);
    }
  }, [memberOptions, form.miembro]);

  // ── Validaciones ────────────────────────────────────────────────────────────
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
  const nombre  = form.contactoReferido.trim();
  const importe = form.importe.trim();
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  // MIEMBROS
  if (!form.miembro)
    newErrors.miembro = "Debe seleccionar un miembro.";

  // CONTACTO REFERIDO 
  if (!nombre)
    newErrors.contactoReferido = "El nombre del contacto es requerido.";
  else if (nombre.length < 3)
    newErrors.contactoReferido = "Debe tener al menos 3 caracteres.";
  else if (!nombreRegex.test(nombre))
    newErrors.contactoReferido = "Solo puede contener letras y espacios.";

  // IMPORTE 
  if (!importe) {
    newErrors.importe = "El importe es requerido.";
  } else {
    const valor = parseFloat(importe.replace(",", "."));
    if (isNaN(valor))
      newErrors.importe = "Introduce un importe válido (ej: 1500 o 1500,00).";
    else if (valor <= 0)
      newErrors.importe = "El importe debe ser mayor que 0.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // ── SUBMIT (CREAR O ACTUALIZAR) ────────────────────────────────────────────
  const handleSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) {
      setIsError(true);
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        receptorId: form.miembro,
        nombreContacto: form.contactoReferido,
        importe: parseFloat(form.importe.replace(",", ".")),
        fechaNegocio: form.fechaNegocio.toISOString(),
      };

      if (isEditMode) {
        await actualizarAgradecimiento(id as string, payload);
        showToast("Agradecimiento actualizado", "success");
      } else {
        await crearAgradecimiento({ ...payload, referenciaId: null });
        showToast("Agradecimiento registrado", "success");
      }

      triggerRefresh();
      router.back();
    } catch (error: any) {
      showToast(error.message || "Error al procesar", "error");
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
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>
            {isEditMode ? "Editar Agradecimiento" : "Gracias Negocio Cerrado"}
          </Text>
          <Text style={globalStyles.containerDescription}>
            {isEditMode
              ? "Modifica los detalles del negocio cerrado."
              : "Agradece por el negocio que has cerrado con el contacto referido."}
          </Text>
        </View>

        <View style={globalStyles.formFields}>
          {/* FormFields (Miembro, Contacto, Importe, Fecha) se quedan igual */}
          <FormField label="Gracias a" icon="megaphone" error={errors.miembro}>
            <TouchableOpacity
              onPress={() => {
                if (!loading) {
                  memberSheetRef.current?.snapToIndex(0);
                }
              }}
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

          <FormField
            label="Fecha del negocio cerrado"
            icon="calendar-clear"
            error={errors.fechaNegocio}
          >
            <TouchableOpacity
              onPress={() => dateSheetRef.current?.snapToIndex(0)}
            >
              <Text>
                {form.fechaNegocio.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </TouchableOpacity>
          </FormField>
        </View>

        {submitting ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
        ) : (
          <Button
            label={
              isEditMode ? "Actualizar Agradecimiento" : "Enviar Agradecimiento"
            }
            variant="primary"
            onPress={handleSubmit}
            disabled={submitting}
          />
        )}
      </KeyboardAwareScrollView>

      {/* Sheets se quedan igual */}
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

      <DatePickerSheet
        ref={dateSheetRef}
        value={form.fechaNegocio}
        onConfirm={(selectedDate) => {
          setForm((prev) => ({ ...prev, fechaNegocio: selectedDate }));
          clearError("fechaNegocio");
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />
    </View>
  );
}
