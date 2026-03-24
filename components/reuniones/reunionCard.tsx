import { reunionesStyles as styles } from "@/styles/reuniones.styles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export interface ReunionItem {
  id: string;
  dia: string;
  mes: string;
  hora: string;
  nombre: string;
  empresa: string;
  descripcion: string;
}

interface Props {
  item: ReunionItem;
}

export default function ReunionCard({ item }: Props) {
  return (
    <View style={styles.card}>
      {/* Columna fecha: dos bloques apilados */}
      <View style={styles.cardDateCol}>
        <View style={styles.cardDateTop}>
          <Text style={styles.cardDay}>{item.dia}</Text>
          <Text style={styles.cardMonth}>{item.mes}</Text>
        </View>
        <View style={styles.cardDateBottom}>
          <Text style={styles.cardHourSmall}>{item.hora}</Text>
        </View>
      </View>

      {/* Avatar */}
      <View style={styles.cardAvatar}>
        <FontAwesome5 name="user" size={18} color="#9FBDB5" />
      </View>

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardHour}>{item.hora}</Text>
        <Text style={styles.cardName} numberOfLines={1}>
          <Text style={styles.cardNameBold}>{item.nombre}</Text>
          <Text style={styles.cardNameNormal}> - {item.empresa}</Text>
        </Text>
        <Text style={styles.cardDesc} numberOfLines={1}>{item.descripcion}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#B0C4BC" style={styles.cardChevron} />
    </View>
  );
}