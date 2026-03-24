import { ToastProvider } from "@/hooks/useToast";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="(modals)/crearReferencia"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="(modals)/crearAgradecimiento"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="(modals)/envioAgradecimiento"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="(modals)/crearReunion"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
      </ToastProvider>
    </GestureHandlerRootView>
    );
}