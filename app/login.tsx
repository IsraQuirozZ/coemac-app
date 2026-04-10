import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/authService";
import { globalStyles } from "../styles/globals.styles";
import { styles } from "../styles/login.styles";
import { colors } from "../theme/colors";

// TYPES
type FormType = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const params = useLocalSearchParams<{ email?: string }>();

  const [form, setForm] = useState<FormType>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormType>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Prefill email si viene de registro
  useEffect(() => {
    if (params.email) {
      setForm((prev) => ({ ...prev, email: params.email as string }));
    }
  }, [params.email]);

  // VALIDADORES
  const validators = {
    email: (value: string) => {
      if (!value.trim()) return "El email es obligatorio";
      if (value.length > 100) return "Máx 100 caracteres";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
      return "";
    },

    password: (value: string) => {
      if (!value) return "La contraseña es obligatoria";
      if (value.length < 6) return "Mínimo 6 caracteres";
      return "";
    },
  };

  // HANDLE CHANGE
  const handleChange = (field: keyof FormType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // VALIDATE
  const validateForm = () => {
    const newErrors: Partial<FormType> = {};

    (Object.keys(form) as (keyof FormType)[]).forEach((field) => {
      const error = validators[field](form[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleLogin = async () => {
    if (loading) return; // evita doble click

    setGeneralError(null);

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await loginRequest(form.email.trim(), form.password);

      await login(response.token);
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setGeneralError(err.message || "Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        enableOnAndroid
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={globalStyles.containerTitle}>¡Bienvenido de nuevo!</Text>
          <Text style={globalStyles.containerDescription}>
            Inicia sesión para continuar
          </Text>
        </View>

        <View style={globalStyles.formFields}>
          {/* EMAIL */}
          <FormField label="Email" icon="mail" error={errors.email}>
            <TextInput
              placeholder="tucorreo@networking.com"
              placeholderTextColor={colors.secondaryText}
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </FormField>

          {/* PASSWORD */}
          <FormField
            label="Contraseña"
            icon="lock-closed"
            error={errors.password}
            password
          >
            <TextInput
              style={styles.inputPassword}
              placeholder="********"
              placeholderTextColor={colors.secondaryText}
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={colors.secondaryText}
              />
            </TouchableOpacity>
          </FormField>
        </View>

        {/* ERROR GENERAL */}
        {generalError && (
          <Text style={{ color: colors.error, textAlign: "center" }}>
            {generalError}
          </Text>
        )}

        {/* BUTTON */}
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Button
            label="Iniciar sesión"
            variant="primary"
            onPress={handleLogin}
          />
        )}

        {/* REDIRECT */}
        <View style={styles.registerRedirect}>
          <Text style={styles.registerLabel}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
