import { ToastProvider } from "@/hooks/useToast";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";

function AuthGate() {
  const { token, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    //EVITA PANTALLA EN BLANCO
    if (!segments.length) return;


  const inAuthScreen =
    segments[0] === "login"          ||
    segments[0] === "register"       ||
    segments[0] === "forgotPassword" ||
    segments[0] === "resetPassword";

    if (!token && !inAuthScreen) {
      router.replace("/login");
    }

    if (token && inAuthScreen) {
      router.replace("/(tabs)/dashboard");
    }
  }, [token, loading, segments]);

  return <></>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <AuthProvider>
        <ToastProvider>
          <AuthGate />

          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="forgotPassword" />
            <Stack.Screen name="resetPassword" />
            <Stack.Screen name="(tabs)" />

            <Stack.Screen
              name="(modals)/crearReferencia"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="(modals)/crearAgradecimiento"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="(modals)/envioAgradecimiento"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="(modals)/crearReunion"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="(modals)/crearIncidencia"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="(modals)/informe"
              options={{ presentation: "modal" }}
            />

            <Stack.Screen
              name="(modals)/referencias/[id]"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="(modals)/reuniones/[id]"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="(modals)/agradecimientos/[id]"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="(modals)/incidencias/[id]"
              options={{ presentation: "modal" }}
            />
          </Stack>
        </ToastProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
