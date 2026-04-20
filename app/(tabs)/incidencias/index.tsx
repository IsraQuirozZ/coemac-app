import IncidenciaCard from "@/components/incidencias/incidenciaCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import SwipeActions from "@/components/ui/SwipeActions";
import { useToast } from "@/hooks/useToast";
import {
  actualizarEstadoIncidencia,
  eliminarIncidencia,
  getIncidencias,
} from "@/services/incidenciaService";
import { globalStyles } from "@/styles/globals.styles";
import { incidenciasStyles as styles } from "@/styles/incidencias.styles";
import { colors } from "@/theme/colors";
import * as Haptics from "expo-haptics";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export type FilterType = "Pendientes" | "Resueltas";

export default function Incidencias() {
  const router = useRouter();
  const { showToast } = useToast();

  const swipeRefs = useRef<{ [key: string]: Swipeable | null }>({});
  const [openSwipeId, setOpenSwipeId] = useState<string | null>(null);

  const [filter, setFilter] = useState<FilterType>("Pendientes");
  const [incidencias, setIncidencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOpenSwipe = (id: string) => {
    if (openSwipeId && openSwipeId !== id) swipeRefs.current[openSwipeId]?.close();
    setOpenSwipeId(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getIncidencias();
      // Filtramos en el frontend según el botón seleccionado
      const filteredData = data.filter((inc: any) => 
        filter === "Pendientes" ? inc.estado !== "RESUELTA" : inc.estado === "RESUELTA"
      );
      setIncidencias(filteredData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [filter])
  );

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Eliminar esta incidencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar", style: "destructive", onPress: async () => {
          try {
            await eliminarIncidencia(id);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            showToast("Incidencia eliminada", "success");
            swipeRefs.current[id]?.close();
            fetchData();
          } catch (error) {
            showToast("Error al eliminar", "error");
          }
        }
      }
    ]);
  };

  const handleCambiarEstado = async (item: any) => {
    // Si ya está resuelta, evitamos que haga nada (o podrías revertirlo si lo deseas)
    if (item.estado === "RESUELTA") return; 

    try {
      const payload = {
        asunto: item.asunto,
        descripcion: item.descripcion,
        fechaIncidencia: item.fechaIncidencia,
        estado: "RESUELTA",
      };
      await actualizarEstadoIncidencia(item.id, payload);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showToast("Marcada como resuelta", "success");
      fetchData(); // Recargamos para que desaparezca de "Pendientes"
    } catch (error) {
      showToast("Error al actualizar", "error");
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <View style={{ flex: 1 }}>
      <Header title="Incidencias" />

      <ScrollView
        contentContainerStyle={globalStyles.container}
        onScrollBeginDrag={() => { if (openSwipeId) swipeRefs.current[openSwipeId]?.close(); }}
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Control de Incidencias</Text>
          <Text style={globalStyles.containerDescription}>Desliza una incidencia para editar o eliminar.</Text>
        </View>

        <View style={styles.filterContainer}>
          <FilterButton label="Pendientes" active={filter === "Pendientes"} onPress={() => setFilter("Pendientes")} />
          <FilterButton label="Resueltas" position="last" active={filter === "Resueltas"} onPress={() => setFilter("Resueltas")} />
        </View>

        {loading ? <ActivityIndicator color={colors.primary} /> : incidencias.length === 0 ? (
          <Text style={{ textAlign: "center", color: colors.secondaryText }}>No hay incidencias {filter.toLowerCase()}.</Text>
        ) : (
          <View style={styles.cards}>
            {incidencias.map((item) => (
              <SwipeActions
                key={item.id}
                id={item.id}
                onOpen={handleOpenSwipe}
                registerRef={(id, ref) => (swipeRefs.current[id] = ref)}
                actions={[
                  {
                    label: "Editar", icon: "create-outline", color: colors.info,
                    onPress: () => {
                      swipeRefs.current[item.id]?.close();
                      router.push(`/(modals)/crearIncidencia?id=${item.id}`);
                    },
                  },
                  {
                    label: "Eliminar", icon: "trash-outline", color: colors.error,
                    onPress: () => handleDelete(item.id),
                  },
                ]}
              >
                <IncidenciaCard
                  item={{ ...item, fecha: formatDate(item.fechaIncidencia) }}
                  onPressCard={() => router.push(`/(modals)/incidencias/${item.id}`)}
                  onPressBadge={() => handleCambiarEstado(item)}
                />
              </SwipeActions>
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