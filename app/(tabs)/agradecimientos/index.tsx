import AgradecimientoCard from "@/components/agradecimientos/agradecimientoCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import { getAgradecimientos } from "@/services/agradeciminetoService";
import { agradecimientosStyles as styles } from "@/styles/agradecimientos.styles";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export type FilterType = "Recibidos" | "Enviados";

export default function Agradecimientos() {
  const router = useRouter();
  const [filter, setFilter]           = useState<FilterType>("Recibidos");
  const [agradecimientos, setAgradecimientos] = useState<any[]>([]);
  const [loading, setLoading]         = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const direction = filter === "Recibidos" ? "recibidos" : "enviados";
      const data = await getAgradecimientos({ direction });
      setAgradecimientos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Recarga cada vez que la pantalla recibe el foco o cambia el filtro
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [filter]),
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <View style={{ flex: 1 }}>
      <Header title="Agradecimientos" />

      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Gracias Usuario!</Text>
          <Text style={globalStyles.containerDescription}>
            Registro de agradecimientos recibidos y enviados
          </Text>
        </View>

        <View style={styles.filterContainer}>
          <FilterButton
            label="Recibidos"
            active={filter === "Recibidos"}
            onPress={() => setFilter("Recibidos")}
          />
          <FilterButton
            label="Enviados"
            position="last"
            active={filter === "Enviados"}
            onPress={() => setFilter("Enviados")}
          />
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : agradecimientos.length === 0 ? (
          <Text style={styles.noDataText}>
            No hay agradecimientos para mostrar.
          </Text>
        ) : (
          <View style={styles.cards}>
            {agradecimientos.map((item) => (
              <AgradecimientoCard
                key={item.id}
                isRecibido={filter === "Recibidos"}
                item={{
                  id:       item.id,
                  usuario:  filter === "Recibidos"
                              ? `${item.emisor?.nombre || "Usuario"} ${item.emisor?.apellido || ""}`.trim()
                              : `${item.receptor?.nombre || "Usuario"} ${item.receptor?.apellido || ""}`.trim(),
                  motivo:   item.nombreContacto,
                  cantidad: item.importe,
                  fecha:    formatDate(item.createdAt),
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <Button
        containerStyle={styles.addButton}
        label="Agregar Agradecimiento"
        variant="add"
        onPress={() => router.push("/(modals)/crearAgradecimiento")}
      />
    </View>
  );
}