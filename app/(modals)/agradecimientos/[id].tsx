import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { detalleReferenciaStyles as styles } from "@/styles/detalleReferencia.styles";
import { globalStyles } from "@/styles/globals.styles";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
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
import { eliminarAgradecimiento, getAgradecimientoById } from "../../../services/agradeciminetoService";
import { colors } from "../../../theme/colors";

export default function AgradecimientoDetail() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { id } = useLocalSearchParams();

  const [agradecimiento, setAgradecimiento] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Layout states for description
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [measured, setMeasured] = useState(false);
  const MAX_LINES = 4;

  const isReceived = agradecimiento?.receptor?.id === user?.id;
  const isOwner = agradecimiento?.emisor?.id === user?.id;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No especificado";
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("es-ES", {
      day: "2-digit", month: "short", year: "numeric",
    });
    return formatted.replace(/(\s[a-z])/, (match) => match.toUpperCase());
  };

  const fetchAgradecimiento = async () => {
    try {
      setLoading(true);
      const data = await getAgradecimientoById(id as string);
      setAgradecimiento(data);
    } catch (error) {
      console.log("Error al cargar detalle:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setExpanded(false);
      setShowMore(false);
      setMeasured(false);
      fetchAgradecimiento();
    }, [id])
  );

  const handleDelete = () => {
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
              await eliminarAgradecimiento(id as string);
              showToast("Agradecimiento eliminado", "success");
              router.back();
            } catch (error: any) {
              Alert.alert("Error", error.message || "No se pudo eliminar");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HandlerIndicator />

      <View style={styles.container}>
        <Text style={globalStyles.containerTitle}>Detalle del Agradecimiento</Text>
      </View>
      <View style={styles.divider}></View>

      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            
            <View style={styles.contactContainer}>
              <Text style={globalStyles.containerTitle}>
                {isReceived
                  ? `${agradecimiento?.emisor?.nombre} ${agradecimiento?.emisor?.apellido}`
                  : `${agradecimiento?.receptor?.nombre} ${agradecimiento?.receptor?.apellido}`}
              </Text>
              <Text style={styles.cargoContainer}>
                {isReceived ? "Remitente (Emisor)" : "Destinatario (Receptor)"}
              </Text>
            </View>
            <View style={styles.divider}></View>

            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Ionicons name="cash-outline" size={20} color={colors.success} />
                <Text style={[styles.infoText, { fontWeight: 'bold', color: colors.success }]}>
                  Importe: {agradecimiento?.importe ? `${agradecimiento.importe} €` : "0 €"}
                </Text>
              </View>
              
              <View style={styles.info}>
                <Ionicons name="person-outline" size={20} color={colors.primary} />
                <Text style={styles.infoText}>
                  Contacto: {agradecimiento?.nombreContacto || "No especificado"}
                </Text>
              </View>

              <View style={styles.infoDate}>
                <View style={styles.info}>
                  <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                  <Text style={styles.infoText}>
                    Fecha Negocio: {formatDate(agradecimiento?.fechaNegocio)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider}></View>
            
            <Text style={styles.descripcion}>Comentarios / Detalles</Text>
            <View>
              <Text
                key={agradecimiento?.id}
                style={styles.infoText}
                numberOfLines={expanded ? undefined : measured ? MAX_LINES : undefined}
                onTextLayout={(e) => {
                  if (!measured) {
                    if (e.nativeEvent.lines.length > MAX_LINES) setShowMore(true);
                    setMeasured(true);
                  }
                }}
              >
                {agradecimiento?.comentarios || agradecimiento?.descripcion || "Sin comentarios."}
              </Text>

              {showMore && (
                <Text style={styles.verMas} onPress={() => setExpanded(!expanded)}>
                  {expanded ? "Ver menos" : "Ver más..."}
                </Text>
              )}
            </View>
          </ScrollView>

          <View style={styles.divider}></View>
          <View style={[{ alignItems: "center" }, styles.container]}>
            <Text style={styles.infoText}>
              Registro creado el: {formatDate(agradecimiento?.createdAt)}
            </Text>
          </View>

          {isOwner && (
            <View style={styles.actionsContainer}>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => router.push(`/(modals)/crearAgradecimiento?id=${agradecimiento.id}`)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
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