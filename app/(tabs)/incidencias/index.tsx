import IncidenciaCard from "@/components/incidencias/incidenciaCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { actualizarEstadoIncidencia, getIncidencias } from "@/services/incidenciaService";
import { globalStyles } from "@/styles/globals.styles";
import { incidenciasStyles as styles } from "@/styles/incidencias.styles";
import { colors } from "@/theme/colors";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useToast } from "../../../hooks/useToast";

export default function Incidencias() {
  const router = useRouter();
  const { showToast } = useToast();
  const [incidencias, setIncidencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getIncidencias();
      setIncidencias(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleMarcarResuelta = async (id: string) => {
    try {
      await actualizarEstadoIncidencia(id, "RESUELTA");
      
      showToast("Incidencia marcada como resuelta", "success");
      
      // Actualización "optimista" de la lista local
      setIncidencias((prev) =>
        prev.map((inc) => (inc.id === id ? { ...inc, estado: "RESUELTA" } : inc))
      );
    } catch (error: any) {
      console.error("Error detallado:", error);
      showToast("Error al actualizar: " + error.message, "error");
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <View style={{ flex: 1 }}>
      <Header title="Incidencias" />

      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Incidencias Enviadas</Text>
          <Text style={globalStyles.containerDescription}>
            Revisa el estado de tus incidencias o marca como resueltas las pendientes.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : incidencias.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, color: colors.secondaryText }}>
            No tienes incidencias registradas.
          </Text>
        ) : (
          <View style={styles.cards}>
            {incidencias.map((item) => (
              <IncidenciaCard
                key={item.id}
                item={{
                  id: item.id,
                  asunto: item.asunto,
                  descripcion: item.descripcion,
                  fecha: formatDate(item.createdAt),
                  estado: item.estado,
                }}
                onMarcarResuelta={handleMarcarResuelta}
              />
            ))}
          </View>
        )}
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