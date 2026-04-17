import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { detalleReunionStyles as styles } from "@/styles/detalleReunion.styles";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../hooks/useToast";
import {
  changeReunionStatus,
  deleteReunion,
  getReunionById,
  markReunionAsViewed,
} from "../../../services/reunionService";

export default function ReunionDetail() {
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);

  const { id } = useLocalSearchParams();
  const [reunion, setReunion] = useState<any>(null);

  const isReceived = reunion?.invitadoId === user?.id;
  const isOwner = reunion?.creadorId === user?.id;

  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [measured, setMeasured] = useState(false);
  const MAX_LINES = 4;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No especificado";

    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formatted.replace(/(\s[a-z])/, (match) => match.toUpperCase());
  };

  const fetchReunion = async () => {
    try {
      setLoading(true);
      const data = await getReunionById(id as string);
      setReunion(data);

      if (data.invitadoId === user?.id && !data.viewedAt) {
        try {
          await markReunionAsViewed(id as string);
        } catch (e) {
          console.log("mark viewed error", e);
        }
      }
    } catch (error) {
      console.error("Error fetching reunion:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReunion();
    }, [id]),
  );

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "REALIZADA":
        return colors.successLight;
      case "CANCELADA":
        return colors.errorLight;
      case "PENDIENTE":
        return colors.terciaryText;
      default:
        return colors.terciaryText;
    }
  };

  // DELETE
  const handleDelete = () => {
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
              await deleteReunion(id as string);
              showToast("Reunión eliminada", "success");
              router.back();
            } catch (error) {
              console.log(error);
              if (error instanceof Error) {
                Alert.alert("Error", error.message);
              }
            }
          },
        },
      ],
    );
  };

  // MARK AS REALIZADA O CANCELADA
  const handleChangeStatus = async (
    id: string,
    newStatus: "REALIZADA" | "CANCELADA",
  ) => {
    Alert.alert(
      `Confirmar cambio de estado`,
      `¿Estás seguro de que deseas cambiar el estado de la reunión a ${newStatus.toLowerCase()}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await changeReunionStatus(id as string, newStatus);
              fetchReunion();
            } catch (error) {
              console.log(error);
              if (error instanceof Error) {
                Alert.alert("Error", error.message);
              }
            }
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <HandlerIndicator />
      <View style={styles.container}>
        <Text style={globalStyles.containerTitle}>Detalle Reunion</Text>
      </View>
      <View style={globalStyles.divider}></View>
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.contactContainer}>
              <Text style={globalStyles.containerTitle}>
                Reunión con:{"\n"}
                {isOwner
                  ? `${reunion?.invitado.nombre} ${reunion?.invitado.apellido}`
                  : `${reunion?.creador.nombre} ${reunion?.creador.apellido}`}
              </Text>
              <Text style={styles.cargoContainer}>
                {isOwner
                  ? reunion?.invitado.empresa || "Empresa no especificada"
                  : reunion?.creador.empresa || "Empresa no especificada"}
              </Text>
            </View>

            <View style={globalStyles.divider}></View>

            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Ionicons
                  name="calendar-clear"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.infoText}>
                  {formatDate(reunion?.fecha) || "No especificado"}
                </Text>
              </View>
              <View style={styles.info}>
                <Ionicons name="person" size={20} color={colors.primary} />
                <Text style={styles.infoText}>
                  Creador:{" "}
                  {`${reunion?.creador.nombre} ${reunion?.creador.apellido}`}
                </Text>
              </View>
              <View style={styles.info}>
                <Ionicons name="person" size={20} color={colors.primary} />
                <Text style={styles.infoText}>
                  Invitado:{" "}
                  {`${reunion?.invitado.nombre} ${reunion?.invitado.apellido}`}
                </Text>
              </View>
              <Text
                style={[
                  styles.estadoPill,
                  { backgroundColor: getEstadoColor(reunion?.estado || "") },
                ]}
              >
                {reunion?.estado || "No especificado"}
              </Text>
            </View>
            <View style={globalStyles.divider}></View>
            <Text style={styles.descripcion}>Descripción</Text>
            <View>
              <Text
                key={reunion?.id}
                style={styles.infoText}
                numberOfLines={
                  expanded ? undefined : measured ? MAX_LINES : undefined
                }
                onTextLayout={(e) => {
                  if (!measured) {
                    const totalLines = e.nativeEvent.lines.length;

                    if (totalLines > MAX_LINES) {
                      setShowMore(true);
                    }

                    setMeasured(true);
                  }
                }}
              >
                {reunion?.descripcion || "No especificado"}
              </Text>

              {showMore && (
                <Text
                  style={styles.verMas}
                  onPress={() => setExpanded(!expanded)}
                >
                  {expanded ? "Ver menos" : "Ver más..."}
                </Text>
              )}
            </View>
          </ScrollView>
          <View style={globalStyles.divider}></View>
          <View
            style={[
              !isReceived ? styles.infoDate : { alignItems: "center" },
              styles.container,
            ]}
          >
            <Text style={styles.infoText}>
              Creada: {formatDate(reunion?.createdAt)}
            </Text>
            {!isReceived ? (
              <Text style={styles.infoText}>
                Vista:{" "}
                {reunion?.viewedAt ? formatDate(reunion.viewedAt) : "Aún no."}
              </Text>
            ) : (
              <></>
            )}
          </View>
          {isOwner && reunion?.estado === "PENDIENTE" ? (
            <View style={styles.actionsContainer}>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    router.push(`/(modals)/crearReunion?id=${reunion.id}`);
                  }}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete()}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text></Text>
          )}
          {isReceived && reunion?.estado === "PENDIENTE" && (
            <View style={styles.actionsContainer}>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleChangeStatus(reunion.id, "REALIZADA")}
                >
                  <Text style={styles.buttonText}>REALIZADA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleChangeStatus(reunion.id, "CANCELADA")}
                >
                  <Text style={styles.buttonText}>CANCELADA</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
