import { ToastProvider } from "@/hooks/useToast";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";

// 🔥 Componente que protege rutas
function AuthGate() {
  const { token, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthScreen = segments[0] === "login" || segments[0] === "register";

    // ❌ No autenticado → fuera de login/register
    if (!token && !inAuthScreen) {
      router.replace("/login");
    }

    // ✅ Autenticado → evitar volver a login
    if (token && inAuthScreen) {
      router.replace("/(tabs)/dashboard");
    }
  }, [token, loading, segments]);

  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <AuthProvider>
        <ToastProvider>
          {/* 🔥 Aquí controlamos acceso */}
          <AuthGate />

          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />

            <Stack.Screen name="(tabs)" />

            {/* Modales */}
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
          </Stack>
        </ToastProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
