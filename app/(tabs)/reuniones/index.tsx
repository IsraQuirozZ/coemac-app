import Header from "@/components/layout/Header";
import ReunionCard from "@/components/reuniones/reunionCard";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import SwipeActions from "@/components/ui/SwipeActions";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { deleteReunion, getReuniones } from "@/services/reunionService";
import { globalStyles } from "@/styles/globals.styles";
import { reunionesStyles as styles } from "@/styles/reuniones.styles";
import { colors } from "@/theme/colors";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

type ReunionItem = {
  id: string;
  fecha: string;
  descripcion?: string;
  estado: "PENDIENTE" | "CONFIRMADA" | "REALIZADA" | "CANCELADA";
  viewedAt?: string | null;

  creador: {
    nombre: string;
    apellido: string;
    empresa?: string | null;
  };

  invitado: {
    nombre: string;
    apellido: string;
    empresa?: string | null;
  };
};

export default function Reuniones() {
  const { user } = useAuth();
  const isAdmin = user?.rol === "ADMIN";
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  const router = useRouter();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);

  // SWIPEABLE
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

  // FETCH REUNIONES
  const [reuniones, setReuniones] = useState<ReunionItem[]>([]);
  const [direccion, setDireccion] = useState<"Recibidas" | "Enviadas">(
    "Recibidas",
  );
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

      const direction = direccion === "Recibidas" ? "recibidas" : "enviadas";

      const rew = await getReuniones({
        direction,
        estado: "todas",
        page: pageToLoad,
        limit: 10,
      });

      const newData = rew.data;

      // setReuniones((prev) => (isLoadMore ? [...prev, ...newData] : newData));

      // const total = rew.pagination.total;
      // const totalLoaded = isLoadMore
      //   ? reuniones.length + newData.length
      //   : newData.length;

      // setHasMore(totalLoaded < total);
      // setPage(pageToLoad);

      setReuniones((prev) => {
        const updated = isLoadMore ? [...prev, ...newData] : newData;

        setHasMore(updated.length < rew.pagination.total);
        return updated;
      });

      setPage(pageToLoad);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const mapReunionToCard = (item: ReunionItem) => {
    const fecha = new Date(item.fecha);

    const dia = fecha.getDate().toString();
    const mes = fecha.toLocaleString("es-ES", { month: "short" });

    const isReceived = direccion === "Recibidas";

    const member = isReceived ? item.creador : item.invitado;

    return {
      id: item.id,
      dia,
      mes,
      nombre: `${member.nombre}`,
      apellido: `${member.apellido}`,
      empresa: member.empresa || "",
      descripcion: item.descripcion || "",
      estado: item.estado,
      viewed: isAdmin ? true : isReceived ? !!item.viewedAt : true,
    };
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     setPage(1);
  //     setHasMore(true);
  //     fetchData(1, false);
  //   }, [direccion]),
  // );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchData(1, false);
  }, [direccion]);

  // DELETE SWIPEABLE
  // DELETE
  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta reunión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReunion(id);

              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );

              showToast("Reunión eliminada", "success");
              swipeRefs.current[id]?.close();
              fetchData(1, false);
            } catch (error) {
              if (error instanceof Error) {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error,
                );

                showToast(`${error.message}`, "error");
              }
            }
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Reuniones" />
      <ScrollView
        contentContainerStyle={globalStyles.container}
        onScrollBeginDrag={() => {
          if (openSwipeId) {
            swipeRefs.current[openSwipeId]?.close();
          }
        }}
      >
        {/* Título y subtítulo */}
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>
            {isAdmin ? "Reuniones" : "Tus Reuniones"}
          </Text>
          <Text style={globalStyles.containerDescription}>
            {isAdmin
              ? "Registro de reuniones globales."
              : "Registro de tus reuniones."}
          </Text>
        </View>

        {/* Filtros Recibidas / Enviadas */}
        {isAdmin ? (
          <Button
            label="+ Informe"
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: "/(modals)/informeEntity",
                params: { type: "reuniones", period: selectedPeriod },
              })
            }
          />
        ) : (
          <View style={styles.filterContainer}>
            <FilterButton
              label="Recibidas"
              active={direccion === "Recibidas"}
              onPress={() => {
                setDireccion("Recibidas");
              }}
            />
            <FilterButton
              label="Enviadas"
              position="last"
              active={direccion === "Enviadas"}
              onPress={() => {
                setDireccion("Enviadas");
              }}
            />
          </View>
        )}

        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : reuniones.length === 0 ? (
          <Text style={styles.noDataText}> No hay reuniones para mostrar </Text>
        ) : (
          <View style={globalStyles.formFields}>
            {reuniones.map((item) => {
              const key = `reunion-${item.id}`;
              const mapped = mapReunionToCard(item);

              const isReceived = direccion === "Recibidas";
              const isEditable = item.estado === "PENDIENTE";

              const card = (
                <TouchableOpacity
                  onPress={() => router.push(`/(modals)/reuniones/${item.id}`)}
                >
                  <ReunionCard item={mapped} />
                </TouchableOpacity>
              );

              if (!isReceived && isEditable) {
                return (
                  <SwipeActions
                    key={key}
                    id={item.id}
                    onOpen={handleOpenSwipe}
                    registerRef={registerSwipeRef}
                    actions={[
                      {
                        label: "Editar",
                        icon: "create-outline",
                        color: colors.info,
                        onPress: () => {
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Medium,
                          );

                          swipeRefs.current[item.id]?.close();
                          router.push(`/(modals)/crearReunion?id=${item.id}`);
                        },
                      },
                      {
                        label: "Eliminar",
                        icon: "trash-outline",
                        color: colors.error,
                        onPress: () => {
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Medium,
                          );

                          handleDelete(item.id);
                        },
                      },
                    ]}
                  >
                    {card}
                  </SwipeActions>
                );
              }

              return <View key={key}>{card}</View>;
            })}
          </View>
        )}
        {loadingMore && (
          <ActivityIndicator
            style={{ marginVertical: 20 }}
            color={colors.primary}
          />
        )}
      </ScrollView>

      {!isAdmin && (
        <Button
          containerStyle={styles.addButton}
          label="Agregar Reunión"
          variant="add"
          onPress={() => {
            router.push("/(modals)/crearReunion");
          }}
        />
      )}
    </View>
  );
}
