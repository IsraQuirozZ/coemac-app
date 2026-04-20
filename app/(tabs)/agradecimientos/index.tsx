import AgradecimientoCard from "@/components/agradecimientos/agradecimientoCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import SwipeActions from "@/components/ui/SwipeActions";
import { useToast } from "@/hooks/useToast";
import {
  eliminarAgradecimiento,
  getAgradecimientos,
} from "@/services/agradeciminetoService"; // Revisa que la ruta de importación sea correcta
import { agradecimientosStyles as styles } from "@/styles/agradecimientos.styles";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import * as Haptics from "expo-haptics";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export type FilterType = "Recibidos" | "Enviados";

export default function Agradecimientos() {
  const router = useRouter();
  const { showToast } = useToast();

  // SWIPEABLE REFS
  const swipeRefs = useRef<{ [key: string]: Swipeable | null }>({});
  const [openSwipeId, setOpenSwipeId] = useState<string | null>(null);

  const handleOpenSwipe = (id: string) => {
    if (openSwipeId && openSwipeId !== id) {
      swipeRefs.current[openSwipeId]?.close();
    }
    setOpenSwipeId(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const registerSwipeRef = (id: string, ref: Swipeable | null) => {
    swipeRefs.current[id] = ref;
  };

  // ESTADO
  const [filter, setFilter] = useState<FilterType>("Recibidos");
  const [agradecimientos, setAgradecimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH & PAGINATION
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = async (pageToLoad = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const direction = filter === "Recibidos" ? "recibidos" : "enviados";
      const res = await getAgradecimientos({ direction, page: pageToLoad, limit: 10 });

      // Ajusta esto dependiendo de cómo te devuelva los datos tu backend
      const newData = res.data || res; 
      
      setAgradecimientos((prev) => (isLoadMore ? [...prev, ...newData] : newData));

      const total = res.pagination?.total || newData.length; // Ajustar a tu backend
      const totalLoaded = isLoadMore ? agradecimientos.length + newData.length : newData.length;

      setHasMore(totalLoaded < total);
      setPage(pageToLoad);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setHasMore(true);
      fetchData(1, false);
    }, [filter]),
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este agradecimiento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await eliminarAgradecimiento(id);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              showToast("Agradecimiento eliminado", "success");
              swipeRefs.current[id]?.close();
              fetchData(1, false); // Refresca la lista
            } catch (error: any) {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
              showToast(error.message || "Error al eliminar", "error");
            }
          },
        },
      ],
    );
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <View style={{ flex: 1 }}>
      <Header title="Agradecimientos" />

      <ScrollView
        contentContainerStyle={globalStyles.container}
        onScrollBeginDrag={() => {
          if (openSwipeId) swipeRefs.current[openSwipeId]?.close();
        }}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

          if (isNearBottom && hasMore && !loadingMore && !loading) {
            fetchData(page + 1, true);
          }
        }}
        scrollEventThrottle={200}
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>¡Gracias Usuario!</Text>
          <Text style={globalStyles.containerDescription}>
            Registro de agradecimientos recibidos y enviados.
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
          <Text style={{ textAlign: "center", marginTop: 20, color: colors.secondaryText }}>
            No hay agradecimientos para mostrar.
          </Text>
        ) : (
          <View style={styles.cards}>
            {agradecimientos.map((item) => {
              const isRecibido = filter === "Recibidos";
              
              // 1. Definimos la tarjeta base y la envolvemos en TouchableOpacity para el Detalle
              const card = (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  onPress={() => router.push(`/(modals)/agradecimientos/${item.id}`)}
                >
                  <AgradecimientoCard
                    isRecibido={isRecibido}
                    item={{
                      id: item.id,
                      usuario: isRecibido
                        ? `${item.emisor?.nombre || "Usuario"} ${item.emisor?.apellido || ""}`.trim()
                        : `${item.receptor?.nombre || "Usuario"} ${item.receptor?.apellido || ""}`.trim(),
                      motivo: item.nombreContacto, // O ajusta según tu base de datos
                      cantidad: item.importe,
                      fecha: formatDate(item.fechaNegocio || item.createdAt),
                    }}
                  />
                </TouchableOpacity>
              );

              // 2. Si es enviado, le aplicamos el SwipeActions
              if (!isRecibido) {
                return (
                  <SwipeActions
                    key={item.id}
                    id={item.id}
                    onOpen={handleOpenSwipe}
                    registerRef={registerSwipeRef}
                    actions={[
                      {
                        label: "Editar",
                        icon: "create-outline",
                        color: colors.info,
                        onPress: () => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          swipeRefs.current[item.id]?.close();
                          router.push(`/(modals)/crearAgradecimiento?id=${item.id}`);
                        },
                      },
                      {
                        label: "Eliminar",
                        icon: "trash-outline",
                        color: colors.error,
                        onPress: () => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          handleDelete(item.id);
                        },
                      },
                    ]}
                  >
                    {card}
                  </SwipeActions>
                );
              }

              // 3. Si es recibido, simplemente devolvemos la tarjeta con el Touchable
              return <View key={item.id}>{card}</View>;
            })}
          </View>
        )}
        
        {loadingMore && (
          <ActivityIndicator style={{ marginVertical: 20 }} color={colors.primary} />
        )}
      </ScrollView>

      <Button
        containerStyle={globalStyles.addButton} // Usa globalStyles o styles según prefieras
        label="Agregar Agradecimiento"
        variant="add"
        onPress={() => router.push("/(modals)/crearAgradecimiento")}
      />
    </View>
  );
}