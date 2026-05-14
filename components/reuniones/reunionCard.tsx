import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

const DESCRIPTION_PREVIEW_LENGTH = 23;

export interface ReunionItem {
  id: string;
  nombre: string;
  apellido: string;
  empresa: string;
  dia: string;
  mes: string;
  descripcion: string;
  estado: string;
  viewed: boolean;
}

interface Props {
  item: ReunionItem;
}

// Color del badge según estado
const estadoBadgeColor = (estado: string) => {
  switch (estado) {
    case "REALIZADA":  return colors.successLight;
    case "CANCELADA":  return colors.error;
    case "CONFIRMADA": return colors.primary;
    default:           return colors.terciaryText; // PENDIENTE
  }
};

export default function ReunionCard({ item }: Props) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (item.viewed) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1,   duration: 1000, useNativeDriver: true }),
      ]),
    ).start();
  }, [item.viewed]);

  const truncatedDescription =
    item.descripcion.length > DESCRIPTION_PREVIEW_LENGTH
      ? `${item.descripcion.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`
      : item.descripcion;

  const mes = item.mes.charAt(0).toUpperCase() + item.mes.slice(1).toLowerCase();
  const iniciales = `${item.nombre.charAt(0) ?? ""}${item.apellido.charAt(0) ?? ""}`.toUpperCase();

  return (
    <View style={[styles.card, item.viewed && styles.viewedCard]}>

      {/* Columna izquierda: fecha */}
      <View style={styles.cardDate}>
        <Text style={styles.cardDay}>{item.dia}</Text>
        <Text style={styles.cardMonth}>{mes}</Text>
      </View>

      {/* Avatar */}
      <View style={styles.cardAvatar}>
        <Text style={styles.avatarName}>{iniciales}</Text>
      </View>

      {/* Info — ocupa el espacio restante */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardName} numberOfLines={1}>
          <Text style={styles.cardNameBold}>{item.nombre} - </Text>
          <Text style={styles.cardNameNormal}>
            {item.empresa || "Sin empresa"}
          </Text>
        </Text>
        <Text style={styles.cardDesc} numberOfLines={1}>
          {truncatedDescription || "Sin descripción"}
        </Text>

        {/* Badge en el flujo normal — debajo del texto, no encima */}
        {!item.viewed ? (
          <Animated.View style={[styles.dot, { opacity }]} />
        ) : (
          <View style={[styles.badge, { backgroundColor: estadoBadgeColor(item.estado) }]}>
            <Text style={styles.badgeText}>{item.estado}</Text>
          </View>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    padding: 12,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",   // centra verticalmente todos los hijos
    // Sin height fijo — el contenido determina la altura
  },
  viewedCard: {
    borderColor: colors.border,
  },

  // Bloque fecha
  cardDate: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.soft,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    minWidth: 44,
    flexShrink: 0,
  },
  cardDay: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.primary,
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  cardMonth: {
    fontSize: 13,
    color: colors.primary,
    lineHeight: 16,
  },

  // Avatar
  cardAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarName: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "700",
  },

  // Info: nombre + descripción + badge en columna
  cardInfo: {
    flex: 1,
    gap: 3,
  },
  cardName: {
    fontSize: 15,
    lineHeight: 20,
  },
  cardNameBold: {
    fontWeight: "700",
    color: colors.primary,
  },
  cardNameNormal: {
    color: colors.secondaryText,
    fontSize: 13,
  },
  cardDesc: {
    fontSize: 12,
    color: colors.secondaryText,
  },

  // Badge de estado — en flujo normal, no absolute
  badge: {
    alignSelf: "flex-start",   // solo ocupa el ancho de su texto
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 2,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },

  // Punto animado para no visto
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginTop: 4,
  },
});