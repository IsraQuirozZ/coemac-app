import { incidenciasStyles as styles } from "@/styles/incidencias.styles";
import { Text, View } from "react-native";

const DESCRIPTION_PREVIEW_LENGTH = 40;

export type EstadoIncidencia = "Pendiente" | "Resuelta";

export interface IncidenciaItem {
  id: string;
  asunto: string;
  fallo: string;
  fecha: string;
  estado: EstadoIncidencia;
}

interface Props {
  item: IncidenciaItem;
}

export default function IncidenciaCard({ item }: Props) {
  const esResuelta = item.estado === "Resuelta";
  const truncatedFallo =
    item.fallo.length > DESCRIPTION_PREVIEW_LENGTH
      ? `${item.fallo.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`
      : item.fallo;

  return (
    <View style={styles.card}>
      {/* Fila superior: asunto + badge estado */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardAsunto} numberOfLines={1}>
          <Text style={styles.cardAsuntoLabel}>Asunto: </Text>
          <Text style={styles.cardAsuntoValor}>{item.asunto}</Text>
        </Text>
        <View
          style={[
            styles.badge,
            esResuelta ? styles.badgeResuelta : styles.badgePendiente,
          ]}
        >
          <Text
            style={
              esResuelta ? styles.badgeTextResuelta : styles.badgeTextPendiente
            }
          >
            {item.estado}
          </Text>
        </View>
      </View>

      {/* Fallo */}
      <Text style={styles.cardHora} numberOfLines={1}>
        Fallo: {truncatedFallo}
      </Text>

      {/* Fecha */}
      <Text style={styles.cardFecha}>Fecha: {item.fecha}</Text>
    </View>
  );
}
