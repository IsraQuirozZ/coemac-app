// import { reunionesStyles as styles } from "@/styles/reuniones.styles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

const DESCRIPTION_PREVIEW_LENGTH = 23;

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
  isOpen: boolean;
  onToggle: () => void;
}

export default function ReunionCard({ item, isOpen, onToggle }: Props) {
  const truncatedDescription =
    item.descripcion.length > DESCRIPTION_PREVIEW_LENGTH
      ? `${item.descripcion.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`
      : item.descripcion;

  return (
    <View>
      <Pressable style={styles.card} onPress={onToggle}>
        {/* Columna fecha: dos bloques apilados */}
        <View style={styles.cardDateCol}>
          <View style={styles.cardDateTop}>
            <Text style={styles.cardDay}>{item.dia}</Text>
            <Text style={styles.cardMonth}>{item.mes}</Text>
          </View>
          <Text style={styles.cardDateBottom}>{item.hora}</Text>
        </View>

        <View style={styles.cardInfoContainer}>
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
            {isOpen ? (
              <Text style={styles.cardDesc}>{""}</Text>
            ) : (
              <Text style={styles.cardDesc}>{truncatedDescription}</Text>
            )}
          </View>
        </View>

        {isOpen ? (
          <Ionicons name="chevron-down" size={20} color={colors.terciaryText} />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.terciaryText}
          />
        )}
      </Pressable>
      {isOpen && <Text style={styles.fullDescription}>{item.descripcion}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
    gap: 15,
    justifyContent: "space-between",
  },

  // ── Columna fecha (dos bloques apilados) ──
  cardDateCol: { borderColor: colors.border, borderWidth: 1, borderRadius: 10 },
  cardDateTop: {
    backgroundColor: colors.soft,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  cardDay: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.primary,
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  cardMonth: {
    fontSize: 14,
    color: colors.primary,
    lineHeight: 15,
  },
  cardDateBottom: {
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderColor: colors.border,
    borderTopWidth: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 7,
    fontSize: 12,
    color: colors.secondaryText,
  },

  // ── Avatar + info ──
  cardInfoContainer: {
    flexDirection: "row",
    gap: 15,
    flex: 1,
    alignItems: "center",
  },
  cardAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardInfo: { gap: 2 },
  cardHour: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  cardName: { fontSize: 16 },
  cardNameBold: { fontWeight: "700", color: colors.primary },
  cardNameNormal: { color: colors.secondaryText },
  cardDesc: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  cardChevron: { flexShrink: 0, marginLeft: 2 },
  fullDescription: {
    backgroundColor: colors.soft,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    color: colors.secondaryText,
  },
});
