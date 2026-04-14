import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { detalleReferenciaStyles as styles } from "@/styles/detalleReferencia.styles";
import { globalStyles } from "@/styles/globals.styles";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import {
  getReferenciaById,
  markReferenciaAsViewed,
} from "../../../services/referenciaService";
import { colors } from "../../../theme/colors";

export default function ReferenciaDetail() {
  const { user } = useAuth();

  const { id } = useLocalSearchParams();

  const [referencia, setReferencia] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [measured, setMeasured] = useState(false);
  const MAX_LINES = 4;

  const isReceived = referencia?.receptor?.id === user?.id;

  const isOwner = referencia?.emisor?.id === user?.id;

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

  const fetchReferencia = async () => {
    try {
      setLoading(true);
      const data = await getReferenciaById(id as string);
      setReferencia(data);

      if (data.receptorId === user?.id && !data.viewedAt) {
        markReferenciaAsViewed(id as string);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setExpanded(false);
      setShowMore(false);
      setMeasured(false);
      fetchReferencia();
    }, [id]),
  );

  return (
    <View style={{ flex: 1 }}>
      <HandlerIndicator />

      <View style={styles.container}>
        <Text style={globalStyles.containerTitle}>Detalle Referencia</Text>
      </View>
      <View style={styles.divider}></View>
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.contactContainer}>
              <Text style={globalStyles.containerTitle}>
                {referencia?.nombreContacto}
              </Text>
              <Text style={styles.cargoContainer}>
                {referencia?.cargoContacto || "No especificado"}
              </Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Ionicons name="call" size={20} color={colors.primary} />
                <Text style={styles.infoText}>
                  {referencia?.telefonoContacto || "No especificado"}
                </Text>
              </View>
              <View style={styles.info}>
                <Ionicons name="mail" size={25} color={colors.primary} />
                <Text style={styles.infoText}>
                  {referencia?.emailContacto || "No especificado"}
                </Text>
              </View>
              <View style={styles.info}>
                <Ionicons name="person" size={20} color={colors.primary} />
                <Text style={styles.infoText}>
                  {isReceived ? "De:" : "Para:"}{" "}
                  {isReceived
                    ? `${referencia?.emisor?.nombre} ${referencia?.emisor?.apellido}`
                    : `${referencia?.receptor?.nombre} ${referencia?.receptor?.apellido}` ||
                      "No especificado"}
                </Text>
              </View>
              <View style={styles.infoDate}>
                <View style={styles.info}>
                  <Ionicons name="business" size={20} color={colors.primary} />
                  <Text style={styles.infoText}>
                    Tipo: {referencia?.tipo || "No especificado"}
                  </Text>
                </View>
                <Text style={styles.dateText}>
                  {formatDate(referencia?.fechaReferencia)}
                </Text>
              </View>
            </View>
            <View style={styles.divider}></View>
            <Text style={styles.descripcion}>Descripción</Text>
            <View>
              <Text
                key={referencia?.id}
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
                {referencia?.descripcion || "No especificado"}
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
          <View style={styles.divider}></View>
          <View
            style={[
              !isReceived ? styles.infoDate : { alignItems: "center" },
              styles.container,
            ]}
          >
            <Text style={styles.infoText}>
              Creada: {formatDate(referencia?.createdAt)}
            </Text>
            {!isReceived ? (
              <Text style={styles.infoText}>
                Vista:{" "}
                {referencia?.viewedAt
                  ? formatDate(referencia.viewedAt)
                  : "Aún no."}
              </Text>
            ) : (
              <Text></Text>
            )}
          </View>

          {isOwner && (
            <View style={styles.actionsContainer}>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    router.push(
                      `/(modals)/crearReferencia?id=${referencia.id}`,
                    );
                  }}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
