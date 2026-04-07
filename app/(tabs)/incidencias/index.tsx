import IncidenciaCard from "@/components/incidencias/incidenciaCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { incidenciasStyles as styles } from "@/styles/incidencias.styles";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

// ─────────────────────────────────────────
// MOCK DATA — TODO: prisma.incidencia.findMany({ where: { userId: currentUser.id } })
// ─────────────────────────────────────────
const MOCK_INCIDENCIAS = [
  { id: "1", asunto: "Fallo agradecimientos", hora: "Envío erróneo en formulario de agradecie...", fecha: "17 Mar 2026", estado: "Pendiente" as const },
  { id: "2", asunto: "Fallo agradecimientos", hora: "Envío erróneo en formulario de agradecie...", fecha: "17 Mar 2026", estado: "Resuelta" as const },
];

export default function Incidencias() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Incidencias" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Título y subtítulo */}
        <View style={styles.headerText}>
          <Text style={styles.title}>Incidencias Enviadas</Text>
          <Text style={styles.subtitle}>
            Revisa el status de tus incidencias enviadas.
          </Text>
        </View>

        {/* Lista de cards */}
        <View style={styles.cards}>
          {MOCK_INCIDENCIAS.map((item) => (
            <IncidenciaCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <Button
        containerStyle={styles.addButton}
        label="Nueva Incidencia"
        variant="add"
        onPress={() => router.push("/(modals)/crearIncidencia")}
      />
    </View>
  );
}