import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { crearIncidencia } from "@/services/incidenciaService";
import { incidenciasStyles as styles } from "@/styles/incidencias.styles";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "../../hooks/useToast"; // Ajusta la ruta si es necesario

export default function CrearIncidencia() {
  const router = useRouter();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    asunto: "",
    descripcion: "",
  });

  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    asunto: "",
    descripcion: "",
  });

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    const asunto = form.asunto.trim();
    const descripcion = form.descripcion.trim();

    // ASUNTO
    if (!asunto) {
      newErrors.asunto = "El asunto es requerido.";
    } else if (asunto.length < 5 || asunto.length > 100) {
      newErrors.asunto = "El asunto debe tener entre 5 y 100 caracteres.";
    }

    // DESCRIPCIÓN (Antes "problema")
    if (!descripcion) {
      newErrors.descripcion = "La descripción del problema es requerida.";
    } else if (descripcion.length < 10) {
      newErrors.descripcion = "Describe el problema con al menos 10 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) {
      setIsError(true);
      return;
    }

    try {
      setSubmitting(true);
      await crearIncidencia({
        asunto: form.asunto.trim(),
        descripcion: form.descripcion.trim(),
      });

      showToast("Incidencia enviada correctamente", "success");
      router.back();
    } catch (error: any) {
      showToast(error.message || "Error al enviar la incidencia", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        enableOnAndroid={true}
      >
        <HandlerIndicator />

        <View style={styles.formHeaderText}>
          <Text style={styles.formTitle}>¿Tienes algún problema?</Text>
          <Text style={styles.formSubtitle}>
            Abre una incidencia de algún problema o fallo que hayas tenido con la aplicación.
          </Text>
        </View>

        <View style={styles.formFields}>
          {/* ── Asunto ── */}
          <FormField label="Asunto" icon="pencil" error={errors.asunto}>
            <TextInput
              placeholder="Asunto de la incidencia..."
              placeholderTextColor={colors.secondaryText}
              value={form.asunto}
              onChangeText={(text) => {
                setForm({ ...form, asunto: text });
                clearError("asunto");
              }}
            />
          </FormField>

          {/* ── Problema a resolver (Descripción) ── */}
          <FormField label="Problema a resolver" icon="build" error={errors.descripcion}>
            <TextInput
              placeholder="Describe detalladamente tu problema aquí..."
              placeholderTextColor={colors.secondaryText}
              multiline
              numberOfLines={5}
              style={styles.textArea}
              value={form.descripcion}
              onChangeText={(text) => {
                setForm({ ...form, descripcion: text });
                clearError("descripcion");
              }}
            />
          </FormField>
        </View>

        {isError && (
          <Text style={{ color: colors.error, textAlign: "center", marginBottom: 10 }}>
            {Object.values(errors).find(msg => msg !== "") || "Por favor, solucione los errores antes de enviar."}
          </Text>
        )}

        {submitting ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Button label="Enviar Incidencia" variant="primary" onPress={handleSubmit} />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}