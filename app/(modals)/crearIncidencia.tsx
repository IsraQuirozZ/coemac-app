import Button from "@/components/ui/Button";
import { DatePickerSheet } from "@/components/ui/DatePickerSheet";
import FormField from "@/components/ui/FormField";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { actualizarEstadoIncidencia, crearIncidencia, getIncidenciaById } from "@/services/incidenciaService";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "../../hooks/useToast";

export default function CrearIncidencia() {
  const [submitting, setSubmitting] = useState(false);
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;

  const dateSheetRef = useRef<BottomSheet>(null);
  const [isAnySheetOpen, setIsAnySheetOpen] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => { navigation.setOptions({ gestureEnabled: !isAnySheetOpen }); }, [isAnySheetOpen]);

  const [form, setForm] = useState({
    asunto: "", descripcion: "", fechaIncidencia: new Date(), estado: "PENDIENTE"
  });

  const [errors, setErrors] = useState({ asunto: "", descripcion: "" });

  useEffect(() => {
    if (isEditMode) loadIncidencia();
  }, [id]);

  const loadIncidencia = async () => {
    try {
      setSubmitting(true);
      const data = await getIncidenciaById(id as string);
      setForm({
        asunto: data.asunto || "",
        descripcion: data.descripcion || "",
        fechaIncidencia: data.fechaIncidencia ? new Date(data.fechaIncidencia) : new Date(),
        estado: data.estado || "PENDIENTE"
      });
    } catch (error) {
      showToast("Error al cargar datos", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!form.asunto.trim()) newErrors.asunto = "El asunto es requerido.";
    if (!form.descripcion.trim()) newErrors.descripcion = "La descripción es requerida.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setSubmitting(true);
      const payload = {
        asunto: form.asunto,
        descripcion: form.descripcion,
        fechaIncidencia: form.fechaIncidencia.toISOString(),
        estado: form.estado, 
      };

      if (isEditMode) {
        await actualizarEstadoIncidencia(id as string, payload);
        showToast("Incidencia actualizada", "success");
      } else {
        await crearIncidencia(payload);
        showToast("Incidencia registrada", "success");
      }
      router.back();
    } catch (error: any) {
      showToast("Error al procesar", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HandlerIndicator />
      <KeyboardAwareScrollView contentContainerStyle={globalStyles.formContainer}>
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>{isEditMode ? "Editar Incidencia" : "Nueva Incidencia"}</Text>
          <Text style={globalStyles.containerDescription}>Completa los datos del problema detectado.</Text>
        </View>

        <View style={globalStyles.formFields}>
          <FormField label="Asunto" icon="pencil" error={errors.asunto}>
            <TextInput
              placeholder="Ej: Problema con la red"
              placeholderTextColor={colors.secondaryText}
              value={form.asunto}
              onChangeText={(text) => { setForm({ ...form, asunto: text }); clearError("asunto"); }}
            />
          </FormField>

          <FormField label="Fecha del suceso" icon="calendar-clear">
            <TouchableOpacity onPress={() => dateSheetRef.current?.snapToIndex(0)}>
              <Text style={{ paddingVertical: 10 }}>
                {form.fechaIncidencia.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
              </Text>
            </TouchableOpacity>
          </FormField>

          <FormField label="Descripción" icon="build" error={errors.descripcion}>
            <TextInput
              placeholder="Detalla lo ocurrido..."
              placeholderTextColor={colors.secondaryText}
              multiline
              numberOfLines={4}
              style={{ minHeight: 80, textAlignVertical: "top" }}
              value={form.descripcion}
              onChangeText={(text) => { setForm({ ...form, descripcion: text }); clearError("descripcion"); }}
            />
          </FormField>
        </View>

        {submitting ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
        ) : (
          <Button label={isEditMode ? "Actualizar" : "Enviar"} variant="primary" onPress={handleSubmit} disabled={submitting} />
        )}
      </KeyboardAwareScrollView>

      <DatePickerSheet
        ref={dateSheetRef} value={form.fechaIncidencia}
        onConfirm={(selectedDate) => { setForm({ ...form, fechaIncidencia: selectedDate }); }}
        onOpenChange={setIsAnySheetOpen}
      />
    </View>
  );
}