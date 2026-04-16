import { incidenciasStyles as styles } from "@/styles/incidencias.styles";
import { Text, TouchableOpacity, View } from "react-native";
export type EstadoIncidencia = "PENDIENTE" | "RESUELTA";
export interface IncidenciaItem {
  id: string;
  asunto: string;
  descripcion: string;
  fecha: string;
  estado: EstadoIncidencia;
}

interface Props {
  item: IncidenciaItem;
  onMarcarResuelta: (id: string) => void;
}

export default function IncidenciaCard({ item, onMarcarResuelta }: Props) {
  const esResuelta = item.estado === "RESUELTA";
  const handlePress = () => {
    if (!esResuelta) {
      onMarcarResuelta(item.id);
    }
  };
  return (
    <TouchableOpacity
      onPress={esResuelta ? undefined : handlePress}
      style={[styles.card, { elevation: 3 }]}
      activeOpacity={esResuelta ? 1 : 0.7}
    >
      {/* Usamos el estilo para pointerEvents para evitar el Warning */}
      <View style={{ pointerEvents: 'none' }}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardAsunto}>
            <Text style={styles.cardAsuntoLabel}>Asunto: </Text>
            <Text style={styles.cardAsuntoValor}>{item.asunto}</Text>
          </Text>
          <View style={[
            styles.badge,
            esResuelta ? styles.badgeResuelta : styles.badgePendiente
          ]}>
            
            <Text style={styles.badgeTextPendiente}>
                {item.estado === "RESUELTA" ? "Resuelta" : "Pendiente"}
            </Text>
          </View>

        </View>
        <Text style={styles.cardHora}>Fallo: {item.descripcion}</Text>
        <Text style={styles.cardFecha}>Fecha: {item.fecha}</Text>
      </View>

    </TouchableOpacity>

  );

}