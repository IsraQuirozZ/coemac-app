import IncidenciaCard from "@/components/incidencias/incidenciaCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { globalStyles } from "@/styles/globals.styles";
import { incidenciasStyles as styles } from "@/styles/incidencias.styles";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

// ─────────────────────────────────────────
// MOCK DATA — TODO: prisma.incidencia.findMany({ where: { userId: currentUser.id } })
// ─────────────────────────────────────────
const MOCK_INCIDENCIAS = [
  {
    id: "1",
    asunto: "Fallo agradecimientos",
    fallo: "Envío erróneo en formulario de agradecim...",
    fecha: "17 Mar 2026",
    estado: "Pendiente" as const,
  },
  {
    id: "2",
    asunto: "Fallo agradecimientos",
    fallo: "Envío erróneo en formulario de agradecim...",
    fecha: "17 Mar 2026",
    estado: "Resuelta" as const,
  },
];

export default function Incidencias() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Incidencias" />

      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Incidencias Enviadas</Text>
          <Text style={globalStyles.containerDescription}>
            Revisa el estado de tus incidencias enviadas.
          </Text>
        </View>

        <View style={styles.cards}>
          {MOCK_INCIDENCIAS.map((item) => (
            <IncidenciaCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <Button
        containerStyle={globalStyles.addButton}
        label="Nueva Incidencia"
        variant="add"
        onPress={() => router.push("/(modals)/crearIncidencia")}
      />
    </View>
  );
}
