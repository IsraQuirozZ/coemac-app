import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
  );
}