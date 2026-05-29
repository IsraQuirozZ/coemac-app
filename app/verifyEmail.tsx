import { verifyEmailRequest } from "@/services/authService";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function VerifyEmailScreen() {
  const { token: paramToken } = useLocalSearchParams<{ token: string }>();
  const router = useRouter();

  const [status, setStatus] = useState("loading");

  const verify = async (token: string) => {
    try {
      const response = await verifyEmailRequest(token);
      setStatus("success");
      setTimeout(() => {
        router.replace({
          pathname: "/login",
          params: { email: response.data?.email },
        });
      }, 2000);
    } catch (error) {
      setStatus("error");
    }
  };

  // 1. Cuando entra por primera vez (app cerrada → abierta por deep link)
  useEffect(() => {
    if (paramToken) verify(paramToken);
  }, [paramToken]);

  // 2. Cuando la app YA estaba abierta y llega un nuevo deep link
  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      const { queryParams } = Linking.parse(url);
      const tokenFromUrl = queryParams?.token as string | undefined;
      if (tokenFromUrl) {
        setStatus("loading");
        verify(tokenFromUrl);
      }
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {status === "loading" && <Text>Verificando tu email...</Text>}
      {status === "success" && <Text>¡Email verificado! Redirigiendo a login...</Text>}
      {status === "error" && <Text>Token inválido o expirado. Vuelve a solicitar el enlace.</Text>}
    </View>
  );
}