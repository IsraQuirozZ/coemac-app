import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/hooks/useToast";
import { registerRequest } from "@/services/authService";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { styles } from "../styles/register.styles";

// TYPES
type FormType = {
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const initialForm: FormType = {
  nombre: "",
  apellido: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export default function RegisterScreen() {
  const { showToast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState<FormType>(initialForm);
  const [errors, setErrors] = useState<Partial<FormType>>({});
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // VALIDATORS
  const validators = {
    nombre: (value: string) => {
      if (!value.trim()) return "El nombre es obligatorio";
      if (value.length < 3 || value.length > 50)
        return "Entre 3 y 50 caracteres";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
        return "Solo letras y espacios";
      return "";
    },

    apellido: (value: string) => {
      if (!value.trim()) return "El apellido es obligatorio";
      if (value.length < 3 || value.length > 50)
        return "Entre 3 y 50 caracteres";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
        return "Solo letras y espacios";
      return "";
    },

    username: (value: string) => {
      if (!value.trim()) return "El username es obligatorio";
      if (value.length < 3 || value.length > 20)
        return "Entre 3 y 20 caracteres";
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Solo letras, números y _";
      return "";
    },

    email: (value: string) => {
      if (!value.trim()) return "El email es obligatorio";
      if (value.length > 100) return "Máx 100 caracteres";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
      return "";
    },

    password: (value: string) => {
      if (!value) return "La contraseña es obligatoria";
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value))
        return "Debe tener mayúscula, minúscula, número y un caracter especial";
      return "";
    },

    repeatPassword: (value: string) => {
      if (!value) return "Repite la contraseña";
      if (value !== form.password) return "Las contraseñas no coinciden";
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

  // VALIDATE FORM
  const validateForm = () => {
    const newErrors: Partial<FormType> = {};

    (Object.keys(form) as (keyof FormType)[]).forEach((field) => {
      const error = validators[field]?.(form[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleRegister = async () => {
    setError(null);

    if (!validateForm()) return;

    const data = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    try {
      setLoading(true);

      await registerRequest(data);

      showToast("Verifica tu email para continuar", "info");

      router.replace({ pathname: "/login", params: { email: form.email } });
    } catch (err: any) {
      setError(err?.message || "Error al registrarse");
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
          <Text style={globalStyles.containerTitle}>¡Crea tu cuenta!</Text>
          <Text style={globalStyles.containerDescription}>
            Regístrate para comenzar
          </Text>
        </View>

        <View style={globalStyles.formFields}>
          {/* NOMBRE */}
          <FormField label="Nombre" icon="person-sharp" error={errors.nombre}>
            <TextInput
              placeholder="Nombre"
              placeholderTextColor={colors.secondaryText}
              value={form.nombre}
              onChangeText={(text) => handleChange("nombre", text)}
            />
          </FormField>

          {/* APELLIDO */}
          <FormField
            label="Apellido"
            icon="person-sharp"
            error={errors.apellido}
          >
            <TextInput
              placeholder="Apellido"
              placeholderTextColor={colors.secondaryText}
              value={form.apellido}
              onChangeText={(text) => handleChange("apellido", text)}
            />
          </FormField>

          {/* USERNAME */}
          <FormField label="Username" icon="at" error={errors.username}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={colors.secondaryText}
              value={form.username}
              onChangeText={(text) => handleChange("username", text)}
            />
          </FormField>

          {/* EMAIL */}
          <FormField label="Email" icon="mail" error={errors.email}>
            <TextInput
              placeholder="tucorreo@networking.com"
              placeholderTextColor={colors.secondaryText}
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              autoCapitalize="none"
            />
          </FormField>

          {/* PASSWORD */}
          <FormField
            label="Contraseña"
            icon="lock-closed"
            error={errors.password}
            type="password"
          >
            <TextInput
              style={styles.inputPassword}
              placeholder="********"
              placeholderTextColor={colors.secondaryText}
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
              autoCapitalize="none"
            />
          </FormField>

          {/* REPEAT PASSWORD */}
          <FormField
            label="Repetir Contraseña"
            icon="lock-closed"
            error={errors.repeatPassword}
            type="password"
          >
            <TextInput
              style={styles.inputPassword}
              placeholder="********"
              placeholderTextColor={colors.secondaryText}
              value={form.repeatPassword}
              onChangeText={(text) => handleChange("repeatPassword", text)}
              autoCapitalize="none"
            />
          </FormField>
        </View>
        {error && (
          <Text style={{ color: colors.error, textAlign: "center" }}>
            {error}
          </Text>
        )}
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Button
            label="Registrarse"
            variant="primary"
            onPress={handleRegister}
          />
        )}

        <View style={styles.loginRedirect}>
          <Text style={styles.loginLabel}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
