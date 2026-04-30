import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { useToast } from "@/hooks/useToast";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { changePassword } from "../../services/profileService";
import { styles } from "../../styles/forgotPassword.styles";

export default function ChangePassword() {
  const router = useRouter();
  const { showToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    const newErrors: typeof errors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Ingresa tu contraseña actual";
    }

    if (!newPassword) {
      newErrors.newPassword = "La nueva contraseña es obligatoria";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/.test(
        newPassword,
      )
    ) {
      newErrors.newPassword =
        "Debe tener mayúscula, minúscula, número y símbolo";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Repite la nueva contraseña";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await changePassword({ currentPassword, newPassword });
      showToast("Contraseña actualizada exitosamente", "success");
      router.back();
    } catch (err: any) {
      setErrors({
        currentPassword: err.message || "Error al cambiar la contraseña",
      });
    } finally {
      setLoading(false);
    }
  };

  //   if (success) {
  //     return (
  //       <View
  //         style={[styles.container, { alignItems: "center", paddingTop: 100 }]}
  //       >
  //         <Text style={globalStyles.containerTitle}>
  //           ¡Contraseña actualizada!
  //         </Text>
  //         <Text style={[styles.successText, { marginBottom: 30 }]}>
  //           Tu contraseña ha sido cambiada exitosamente.
  //         </Text>
  //         <Button
  //           label="Volver"
  //           variant="primary"
  //           onPress={() => router.back()}
  //         />
  //       </View>
  //     );
  //   }

  return (
    <View style={{ flex: 1 }}>
      <HandlerIndicator />
      <KeyboardAwareScrollView
        contentContainerStyle={globalStyles.formContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <View style={styles.header}>
          <Text style={globalStyles.containerTitle}>Cambiar Contraseña</Text>
          <Text style={globalStyles.containerDescription}>
            Ingresa tu contraseña actual y elige una nueva.
          </Text>
        </View>

        <View style={globalStyles.formFields}>
          <FormField
            label="Contraseña Actual"
            icon="lock-closed"
            error={errors.currentPassword || ""}
            type="password"
          >
            <TextInput
              style={{ flex: 1, fontSize: 14 }}
              placeholder="********"
              placeholderTextColor={colors.secondaryText}
              value={currentPassword}
              onChangeText={(t) => {
                setCurrentPassword(t);
                if (errors.currentPassword)
                  setErrors((e) => ({ ...e, currentPassword: undefined }));
              }}
              secureTextEntry
              autoCapitalize="none"
              importantForAutofill="no"
              autoCorrect={false}
              autoComplete="off"
            />
          </FormField>

          <FormField
            label="Nueva Contraseña"
            icon="lock-closed"
            error={errors.newPassword || ""}
            type="password"
          >
            <TextInput
              style={{ flex: 1, fontSize: 14 }}
              placeholder="********"
              placeholderTextColor={colors.secondaryText}
              value={newPassword}
              onChangeText={(t) => {
                setNewPassword(t);
                if (errors.newPassword)
                  setErrors((e) => ({ ...e, newPassword: undefined }));
              }}
              secureTextEntry
              autoCapitalize="none"
              importantForAutofill="no"
              autoCorrect={false}
              autoComplete="off"
            />
          </FormField>

          <FormField
            label="Repetir Contraseña"
            icon="lock-closed"
            error={errors.confirmPassword || ""}
            type="password"
          >
            <TextInput
              style={{ flex: 1, fontSize: 14 }}
              placeholder="********"
              placeholderTextColor={colors.secondaryText}
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                if (errors.confirmPassword)
                  setErrors((e) => ({ ...e, confirmPassword: undefined }));
              }}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
            />
          </FormField>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} size="large" />
        ) : (
          <Button
            label="Guardar y Continuar"
            variant="primary"
            onPress={handleChangePassword}
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
