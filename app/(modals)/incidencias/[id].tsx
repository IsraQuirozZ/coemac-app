import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { useToast } from "@/hooks/useToast";
import { eliminarIncidencia, getIncidenciaById } from "@/services/incidenciaService";
import { detalleReferenciaStyles as styles } from "@/styles/detalleReferencia.styles";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function IncidenciaDetail() {
  const { showToast } = useToast();
  const { id } = useLocalSearchParams();

  const [incidencia, setIncidencia] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 // AÑADE ESTO PARA VER QUÉ LLEGA
  console.log("ID recibido en Detalle:", id); 

  const fetchIncidencia = async () => {
    if (!id || id === 'undefined') return; // Evita llamar a la API si el ID es nulo
    try {
      setLoading(true);
      const data = await getIncidenciaById(id as string);
      if (!data) {
        showToast("La incidencia ya no existe", "error");
        router.back();
        return;
      }
      setIncidencia(data);
    } catch (error) {
      console.error("Error API:", error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(useCallback(() => { fetchIncidencia(); }, [id]));

  const handleDelete = () => {
    Alert.alert("Confirmar", "¿Eliminar esta incidencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar", style: "destructive", onPress: async () => {
          try {
            await eliminarIncidencia(id as string);
            showToast("Incidencia eliminada", "success");
            router.back();
          } catch (error: any) {
            Alert.alert("Error", "No se pudo eliminar");
          }
        }
      }
    ]);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No especificado";
    return new Date(dateString).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HandlerIndicator />

      <View style={styles.container}>
        <Text style={globalStyles.containerTitle}>Detalle de Incidencia</Text>
      </View>
      <View style={styles.divider}></View>

      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.contactContainer}>
              <Text style={globalStyles.containerTitle}>{incidencia?.asunto}</Text>
              <Text style={[styles.cargoContainer, { color: incidencia?.estado === "RESUELTA" ? colors.success : colors.error }]}>
                Estado: {incidencia?.estado || "PENDIENTE"}
              </Text>
            </View>
            <View style={styles.divider}></View>

            <View style={styles.infoContainer}>
              <View style={styles.infoDate}>
                <View style={styles.info}>
                  <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                  <Text style={styles.infoText}>Fecha Suceso: {formatDate(incidencia?.fechaIncidencia)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider}></View>
            <Text style={styles.descripcion}>Descripción del problema</Text>
            <View>
              <Text style={styles.infoText}>{incidencia?.descripcion || "Sin detalles."}</Text>
            </View>
          </ScrollView>

          <View style={styles.divider}></View>
          <View style={styles.actionsContainer}>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push(`/(modals)/crearIncidencia?id=${incidencia.id}`)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}