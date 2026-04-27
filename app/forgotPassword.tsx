import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { forgotPasswordRequest } from "@/services/authService";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../styles/forgotPassword.styles";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateIdentifier = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Requerido";
    
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    
    if (!isEmail) return "Ingresa un email válido";
    return null;
  };

  const handleRecover = async () => {
    if (loading) return;

    const validationError = validateIdentifier(identifier);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await forgotPasswordRequest(identifier.trim());
      setIsSubmitted(true);
    } catch (err: any) {
      setError("Hubo un problema de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid>
        {!isSubmitted ? (
          <>
            <View style={styles.header}>
              <Text style={globalStyles.containerTitle}>Recuperar Contraseña</Text>
              <Text style={globalStyles.containerDescription}>
                Ingresa tu correo electrónico y te enviaremos un enlace.
              </Text>
            </View>

            <View style={globalStyles.formFields}>
              <FormField label="Email" icon="person-outline" error={error || ""}>
                <TextInput
                  placeholder="tucorreo@..."
                  placeholderTextColor={colors.secondaryText}
                  value={identifier}
                  onChangeText={(text) => {
                    setIdentifier(text);
                    if (error) setError(null);
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </FormField>
            </View>

            {loading ? (
              <ActivityIndicator color={colors.primary} size="large" />
            ) : (
              <Button label="Enviar enlace" variant="primary" onPress={handleRecover} />
            )}

            <View style={styles.backToLoginContainer}>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.backToLoginLink}>Volver al inicio de sesión</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <Ionicons name="send-outline" size={40} color={colors.primary} />
            </View>
            <Text style={globalStyles.containerTitle}>¡Enlace enviado!</Text>
            <Text style={styles.successText}>
              Si hay una cuenta asociada a <Text style={{ fontWeight: "bold" }}>{identifier}</Text>, recibirás instrucciones en breve.
            </Text>

            <View style={{ width: "100%", marginTop: 20 }}>
              <Button label="Entendido" variant="primary" onPress={() => router.replace("/login")} />
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}