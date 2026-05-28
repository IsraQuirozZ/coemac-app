import { verifyEmailRequest } from "@/services/authService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function verifyEmailScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const router = useRouter();

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmailRequest(token);

      if (response.message === "Account verified successfully") {
          setStatus("success");
          setTimeout(() => {
            router.replace({
              pathname: "/login",
              params: { email: response.email },
            });
          }, 2000);
        }
      } catch (error) {
        setStatus("error");
      }
    };

    if (token) {
      verify();
    }
  }, [token]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {status === "loading" && <Text>Verificando tu email...</Text>}
      {status === "success" && (
        <Text>¡Email verificado! Redirigiendo a login...</Text>
      )}
      {status === "error" && (
        <Text>Token inválido o expirado. Vuelve a solicitar el enlace.</Text>
      )}
    </View>
  );
}
