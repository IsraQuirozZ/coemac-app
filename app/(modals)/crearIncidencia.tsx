import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { incidenciasStyles as styles } from "@/styles/incidencias.styles";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "../../hooks/useToast";

export default function CrearIncidencia() {
  const router = useRouter();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    nombre: "",
    asunto: "",
    problema: "",
  });

  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    nombre: "",
    asunto: "",
    problema: "",
  });

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    const nombre = form.nombre.trim();
    const asunto = form.asunto.trim();
    const problema = form.problema.trim();

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // NOMBRE
    if (!nombre) {
      newErrors.nombre = "El nombre es requerido.";
    } else if (nombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    } else if (!nombreRegex.test(nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras y espacios.";
    }

    // ASUNTO
    if (!asunto) {
      newErrors.asunto = "El asunto es requerido.";
    } else if (asunto.length < 5) {
      newErrors.asunto = "El asunto debe tener al menos 5 caracteres.";
    }

    // PROBLEMA
    if (!problema) {
      newErrors.problema = "El problema a resolver es requerido.";
    } else if (problema.length < 10) {
      newErrors.problema = "Describe el problema con al menos 10 caracteres.";
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
    // TODO: prisma.incidencia.create({ data: { ...form, estado: "Pendiente" } })
    showToast("Incidencia enviada", "success");
    router.back();
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

          {/* ── Tu nombre ── */}
          <FormField label="Tu nombre" icon="person-sharp" error={errors.nombre}>
            <TextInput
              placeholder="Nombre Apellido"
              placeholderTextColor={colors.secondaryText}
              value={form.nombre}
              onChangeText={(text) => {
                setForm({ ...form, nombre: text });
                clearError("nombre");
              }}
            />
          </FormField>

          {/* ── Asunto ── */}
          <FormField label="Asunto" icon="pencil" error={errors.asunto}>
            <TextInput
              placeholder="Asunto..."
              placeholderTextColor={colors.secondaryText}
              value={form.asunto}
              onChangeText={(text) => {
                setForm({ ...form, asunto: text });
                clearError("asunto");
              }}
            />
          </FormField>

          {/* ── Problema a resolver ── */}
          <FormField label="Problema a resolver" icon="build" error={errors.problema}>
            <TextInput
              placeholder="Tu texto aquí..."
              placeholderTextColor={colors.secondaryText}
              multiline
              numberOfLines={5}
              style={styles.textArea}
              value={form.problema}
              onChangeText={(text) => {
                setForm({ ...form, problema: text });
                clearError("problema");
              }}
            />
          </FormField>

        </View>

        {isError && (
          <Text style={{ color: colors.error, textAlign: "center" }}>
            Por favor, solucione los errores antes de enviar.
          </Text>
        )}

        <Button label="Enviar Incidencia" variant="primary" onPress={handleSubmit} />

      </KeyboardAwareScrollView>
    </View>
  );
}