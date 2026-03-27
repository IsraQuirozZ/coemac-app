import { incidenciasStyles as styles } from "@/styles/incidencias.styles";
import { Text, View } from "react-native";

export type EstadoIncidencia = "Pendiente" | "Resuelta";

export interface IncidenciaItem {
  id: string;
  asunto: string;
  hora: string;
  fecha: string;
  estado: EstadoIncidencia;
}

interface Props {
  item: IncidenciaItem;
}

export default function IncidenciaCard({ item }: Props) {
  const esResuelta = item.estado === "Resuelta";

  return (
    <View style={styles.card}>
      {/* Fila superior: asunto + badge estado */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardAsunto} numberOfLines={1}>
          <Text style={styles.cardAsuntoLabel}>Asunto: </Text>
          <Text style={styles.cardAsuntoValor}>{item.asunto}</Text>
        </Text>
        <View style={[styles.badge, esResuelta ? styles.badgeResuelta : styles.badgePendiente]}>
          <Text style={esResuelta ? styles.badgeTextResuelta : styles.badgeTextPendiente}>
            {item.estado}
          </Text>
        </View>
      </View>

      {/* Hora */}
      <Text style={styles.cardHora} numberOfLines={1}>
        Hora: {item.hora}
      </Text>

      {/* Fecha */}
      <Text style={styles.cardFecha}>Fecha: {item.fecha}</Text>
    </View>
  );
}