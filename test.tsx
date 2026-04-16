import { ToastProvider } from "@/hooks/useToast";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "../theme/colors";

export default function RootLayout() {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ToastProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
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
          <Stack.Screen
            name="(modals)/crearIncidencia"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
