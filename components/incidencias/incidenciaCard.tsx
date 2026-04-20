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
  onPressCard: () => void;   // Navega a los detalles
  onPressBadge: () => void;  // Cambia el estado
}

export default function IncidenciaCard({ item, onPressCard, onPressBadge }: Props) {
  const esResuelta = item.estado === "RESUELTA";

  return (
    <TouchableOpacity
      onPress={onPressCard}
      style={[styles.card, { elevation: 3 }]}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardAsunto}>
          <Text style={styles.cardAsuntoLabel}>Asunto: </Text>
          <Text style={styles.cardAsuntoValor}>{item.asunto}</Text>
        </Text>

        {/* AL TOCAR LA ETIQUETA RESOLVEMOS */}
        <TouchableOpacity
          onPress={onPressBadge}
          activeOpacity={esResuelta ? 1 : 0.6}
          style={[
            styles.badge,
            esResuelta ? styles.badgeResuelta : styles.badgePendiente
          ]}
        >
          <Text style={styles.badgeTextPendiente}>
            {esResuelta ? "Resuelta" : "Pendiente"}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.cardHora} numberOfLines={2}>Fallo: {item.descripcion}</Text>
      <Text style={styles.cardFecha}>Fecha: {item.fecha}</Text>
    </TouchableOpacity>
  );
}