import Header from "@/components/layout/Header";
import ReferenceCard from "@/components/referencias/ReferenceCard";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import SwipeActions from "@/components/ui/SwipeActions";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
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
import {
  deleteReferencia,
  getReferencias,
} from "../../../services/referenciaService";
import { referenciasStyles as styles } from "../../../styles/referencias.styles";

export default function Referencias() {
  const { user } = useAuth();
  const isAdmin = user?.rol === "ADMIN";

  const router = useRouter();
  const { showToast } = useToast();

  const [selectedPeriod, setSelectedPeriod] = useState("30d");

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

  const [direccion, setDireccion] = useState<"Recibidas" | "Enviadas">(
    "Recibidas",
  );
  const [tipo, setTipo] = useState<"Todas" | "Internas" | "Externas">("Todas");

  const [referencias, setReferencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH REFERENCIAS
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

      const res = await getReferencias({
        direction,
        tipo,
        page: pageToLoad,
        limit: 10,
      });

      const newData = res.data;

      setReferencias((prev) => (isLoadMore ? [...prev, ...newData] : newData));

      const total = res.pagination.total;
      const totalLoaded = isLoadMore
        ? referencias.length + newData.length
        : newData.length;

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
    }, [direccion, tipo]),
  );

  const mapReferenciaToCard = (ref: any) => {
    const isReceived = direccion === "Recibidas";

    const member = isReceived
      ? `${ref.emisor.nombre} ${ref.emisor.apellido}`
      : `${ref.receptor.nombre} ${ref.receptor.apellido}`;

    const label = isReceived ? "De" : "Para";

    return {
      ...ref,
      member,
      label,
    };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta referencia?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReferencia(id);

              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );

              showToast("Referencia eliminada", "success");
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
      <Header title="Referencias" />
      <ScrollView
        contentContainerStyle={globalStyles.container}
        onScrollBeginDrag={() => {
          if (openSwipeId) {
            swipeRefs.current[openSwipeId]?.close();
          }
        }}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

          const isNearBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 50;

          if (isNearBottom && hasMore && !loadingMore && !loading) {
            fetchData(page + 1, true);
          }
        }}
        scrollEventThrottle={200}
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>
            {isAdmin ? `Referencias` : "Tus Referencias"}
          </Text>
          <Text style={globalStyles.containerDescription}>
            Registro de referencias{" "}
            {isAdmin ? "globales" : "recibidas y enviadas"}.
          </Text>
        </View>
        {isAdmin ? (
          <Button
            label="+ Informe"
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: "/(modals)/informeEntity",
                params: { type: "referencias", period: selectedPeriod },
              })
            }
          />
        ) : (
          <View style={styles.filterContainer}>
            <FilterButton
              label="Recibidas"
              active={direccion === "Recibidas"}
              onPress={() => setDireccion("Recibidas")}
            />
            <FilterButton
              label="Enviadas"
              position="last"
              active={direccion === "Enviadas"}
              onPress={() => setDireccion("Enviadas")}
            />
          </View>
        )}
        <View style={styles.filterContainer}>
          <FilterButton
            label="Todas"
            active={tipo === "Todas"}
            onPress={() => setTipo("Todas")}
          />
          <FilterButton
            label="Internas"
            position="middle"
            active={tipo === "Internas"}
            onPress={() => setTipo("Internas")}
          />
          <FilterButton
            label="Externas"
            position="last"
            active={tipo === "Externas"}
            onPress={() => setTipo("Externas")}
          />
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : referencias.length === 0 ? (
          <Text style={styles.noDataText}>
            No hay referencias para mostrar.
          </Text>
        ) : (
          <View style={styles.referenceCards}>
            {referencias.map((ref) => {
              const mappedRef = mapReferenciaToCard(ref);
              const dateToShow = ref.fechaReferencia || ref.createdAt;

              const isReceived = direccion === "Recibidas";
              const isViewed = !!ref.viewedAt;

              const card = (
                <TouchableOpacity
                  key={ref.id}
                  onPress={() => router.push(`/(modals)/referencias/${ref.id}`)}
                >
                  <ReferenceCard
                    referrer={ref.nombreContacto}
                    position={ref?.cargoContacto || "No especificado"}
                    number={ref?.telefonoContacto || "No especificado"}
                    email={ref?.emailContacto || "No especificado"}
                    member={mappedRef.member}
                    memberLabel={mappedRef.label}
                    referenceType={ref.tipo}
                    date={formatDate(dateToShow)}
                    viewed={isAdmin ? true : isReceived ? isViewed : true}
                  />
                </TouchableOpacity>
              );

              if (!isReceived) {
                return (
                  <SwipeActions
                    key={ref.id}
                    id={ref.id}
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

                          swipeRefs.current[ref.id]?.close();
                          router.push(`/(modals)/crearReferencia?id=${ref.id}`);
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

                          handleDelete(ref.id);
                        },
                      },
                    ]}
                  >
                    {card}
                  </SwipeActions>
                );
              }
              return <View key={ref.id}>{card}</View>;
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
          label="Agregar Referencia"
          variant="add"
          onPress={() => router.push("/(modals)/crearReferencia")}
        />
      )}
    </View>
  );
}
