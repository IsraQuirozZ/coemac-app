import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { resetPasswordRequest } from "@/services/authService";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../styles/forgotPassword.styles";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token: paramToken } = useLocalSearchParams<{ token: string }>();

  // El token se guarda en estado para poder actualizarlo si llega un nuevo deep link
  const [token, setToken] = useState<string | undefined>(paramToken);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Si paramToken cambia (entrada inicial) lo sincroniza
  useEffect(() => {
    if (paramToken) setToken(paramToken);
  }, [paramToken]);

  // Cuando la app YA estaba abierta y llega un nuevo deep link
  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      const { queryParams } = Linking.parse(url);
      const tokenFromUrl = queryParams?.token as string | undefined;
      if (tokenFromUrl) {
        setToken(tokenFromUrl);
        // Reinicia el form por si el usuario tenía algo escrito
        setPassword("");
        setConfirmPassword("");
        setError(null);
        setSuccess(false);
      }
    });

    return () => sub.remove();
  }, []);

  const handleReset = async () => {
    if (!token) {
      setError("Token de seguridad no encontrado. Vuelve a solicitar el enlace.");
      return;
    }

    if (!password) {
      setError("La contraseña es obligatoria");
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/.test(
        password,
      )
    ) {
      setError("Debe tener mayúscula, minúscula, número y símbolo");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await resetPasswordRequest(token, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al actualizar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={[styles.container, { alignItems: "center", paddingTop: 100 }]}>
        <Text style={globalStyles.containerTitle}>¡Contraseña actualizada!</Text>
        <Text style={[styles.successText, { marginBottom: 30 }]}>
          Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión con tu nueva clave.
        </Text>
        <Button label="Ir al Login" variant="primary" onPress={() => router.replace("/login")} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid>
        <View style={styles.header}>
          <Text style={globalStyles.containerTitle}>Nueva Contraseña</Text>
          <Text style={globalStyles.containerDescription}>
            Crea una contraseña fuerte y segura.
          </Text>
        </View>

        <View style={globalStyles.formFields}>
          <FormField label="Nueva Contraseña" icon="lock-closed" error={error || ""} type="password">
            <TextInput
              style={ styles.inputPassword }
              placeholder="********"
              placeholderTextColor={colors.secondaryText}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (error) setError(null);
              }}
              autoCapitalize="none"
            />
          </FormField>

          <FormField label="Confirmar Contraseña" icon="lock-closed" error={error || ""} type="password">
            <TextInput
              style={ styles.inputPassword }
              placeholder="********"
              placeholderTextColor={colors.secondaryText}
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                if (error) setError(null);
              }}
              autoCapitalize="none"
            />
          </FormField>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} size="large" />
        ) : (
          <Button label="Guardar y Continuar" variant="primary" onPress={handleReset} />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}