import { agradecimientosStyles as styles } from "@/styles/agradecimientos.styles";
import { Text, View } from "react-native";

export interface AgradecimientoItem {
  id: string;
  usuario: string;
  motivo: string;
  cantidad: number;
  fecha: string;
}

interface Props {
  item: AgradecimientoItem;
  isRecibido: boolean; 
}

export default function AgradecimientoCard({ item, isRecibido }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardAmountBadge}>
        <Text style={styles.cardAmountText}>
          €{item.cantidad.toLocaleString("es-ES")}
        </Text>
      </View>

      {/* Contenido */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          <Text style={styles.cardUser}>{item.usuario}</Text>
          <Text style={styles.cardTitleSuffix}>
            {isRecibido ? " - Te ha dado las gracias!" : " - Le has dado las gracias!"}
          </Text>
        </Text>
        <Text style={styles.cardMotivo}>Por: {item.motivo}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardCantidad}>
            Cantidad: {item.cantidad.toLocaleString("es-ES")}€
          </Text>
          <Text style={styles.cardFecha}>{item.fecha}</Text>
        </View>
      </View>
    </View>
  );
}