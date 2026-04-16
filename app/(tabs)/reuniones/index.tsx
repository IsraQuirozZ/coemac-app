import Header from "@/components/layout/Header";
import ReunionCard from "@/components/reuniones/reunionCard";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import { getReuniones } from "@/services/reunionService";
import { globalStyles } from "@/styles/globals.styles";
import { reunionesStyles as styles } from "@/styles/reuniones.styles";
import { colors } from "@/theme/colors";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function Reuniones() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // TOGGLE DE DESCRIPCIÓN EN CARD
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  // FETCH REUNIONES
  const [reuniones, setReuniones] = useState<any[]>([]);
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

      setReuniones((prev) => (isLoadMore ? [...prev, ...newData] : newData));

      const total = rew.pagination.total;
      const totalLoaded = isLoadMore
        ? reuniones.length + newData.length
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

  const mapReunionToCard = (item: any) => {
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
      descripcion: item.descripcion,

      viewed: isReceived ? !!item.viewedAt : true,
    };
  };

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setHasMore(true);
      fetchData(1, false);
    }, [direccion]),
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="Reuniones" />
      <ScrollView contentContainerStyle={globalStyles.container}>
        {/* Título y subtítulo */}
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Tus Reuniones</Text>
          <Text style={globalStyles.containerDescription}>
            Registro de tus reuniones.
          </Text>
        </View>

        {/* Filtros Recibidas / Enviadas */}
        <View style={styles.filterContainer}>
          <FilterButton
            label="Recibidas"
            active={direccion === "Recibidas"}
            onPress={() => {
              setDireccion("Recibidas");
              setOpenCardId(null);
            }}
          />
          <FilterButton
            label="Enviadas"
            position="last"
            active={direccion === "Enviadas"}
            onPress={() => {
              setDireccion("Enviadas");
              setOpenCardId(null);
            }}
          />
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : reuniones.length === 0 ? (
          <Text style={styles.noDataText}> No hay reuniones para mostrar </Text>
        ) : (
          <View style={globalStyles.formFields}>
            {reuniones.map((item) => {
              const mapped = mapReunionToCard(item);

              return (
                <ReunionCard
                  key={item.id}
                  item={mapped}
                  isOpen={openCardId === item.id}
                  onToggle={() =>
                    setOpenCardId((prev) => (prev === item.id ? null : item.id))
                  }
                />
              );
            })}
          </View>
        )}
      </ScrollView>

      <Button
        containerStyle={styles.addButton}
        label="Agregar Reunión"
        variant="add"
        onPress={() => {
          router.push("/(modals)/crearReunion");
          setOpenCardId(null);
        }}
      />
    </View>
  );
}
