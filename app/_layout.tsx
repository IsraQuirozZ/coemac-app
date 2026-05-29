import { ToastProvider } from "@/hooks/useToast";
import * as Linking from "expo-linking";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";

function AuthGate() {
  const { token, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!segments.length) return;

    const inAuthScreen =
      segments[0] === "login" ||
      segments[0] === "register" ||
      segments[0] === "forgotPassword" ||
      segments[0] === "resetPassword";

    const inVerifyEmail = segments[0] === "verifyEmail";

    if (!token && !inAuthScreen && !inVerifyEmail) {
      router.replace("/login");
    }

    if (token && inAuthScreen) {
      router.replace("/(tabs)/dashboard");
    }
  }, [token, loading, segments]);

  return <></>;
}

// Escuchador global de deep links
// Captura los enlaces tipo coemac-app://verifyEmail?token=xxx aunque la app
// ya esté abierta y el usuario esté en otra pantalla.
function DeepLinkHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleUrl = (url: string) => {
      const parsed = Linking.parse(url);
      const path = parsed.hostname || parsed.path || "";
      const token = parsed.queryParams?.token as string | undefined;

      if (!path || !token) return;

      if (path.includes("verifyEmail")) {
        router.replace({ pathname: "/verifyEmail", params: { token } });
      } else if (path.includes("resetPassword")) {
        router.replace({ pathname: "/resetPassword", params: { token } });
      }
    };

    // Caso 1: App cerrada y se abre por deep link
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    // Caso 2: App ya abierta y llega un nuevo deep link
    const sub = Linking.addEventListener("url", ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
      <AuthProvider>
        <ToastProvider>
          <AuthGate />
          <DeepLinkHandler />

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
            <Stack.Screen name="verifyEmail" />
            <Stack.Screen name="(tabs)" />

            <Stack.Screen
              name="(modals)/crearReferencia"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="(modals)/crearAgradecimiento"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="(modals)/envioAgradecimiento"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="(modals)/crearReunion"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="(modals)/informe"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="(modals)/informeEntity"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />

            <Stack.Screen
              name="(modals)/referencias/[id]"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="(modals)/reuniones/[id]"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="(modals)/agradecimientos/[id]"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="(modals)/change-password"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="(modals)/manage-users"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : undefined,
                animation: Platform.OS === "android" ? "slide_from_bottom" : undefined,
                gestureEnabled: true,
              }}
            />
          </Stack>
        </ToastProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}