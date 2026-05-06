// import { reunionesStyles as styles } from "@/styles/reuniones.styles";
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

export default function ReunionCard({ item }: Props) {
  const opacity = useRef(new Animated.Value(1)).current;
  const estadoColor =
    item.estado === "PENDIENTE"
      ? colors.terciaryText
      : item.estado === "REALIZADA"
        ? colors.successLight
        : colors.error;

  useEffect(() => {
    if (item.viewed) return;

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [item.viewed]);

  const truncatedDescription =
    item.descripcion.length > DESCRIPTION_PREVIEW_LENGTH
      ? `${item.descripcion.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`
      : item.descripcion;

  const mes =
    item.mes.charAt(0).toUpperCase() + item.mes.slice(1).toLowerCase();

  const iniciales =
    `${item.nombre.charAt(0) ?? ""}${item.apellido.charAt(0) ?? ""}`.toUpperCase();

  return (
    <View>
      <View style={[styles.card, item.viewed && styles.viewedCard]}>
        {/* Columna fecha: dos bloques apilados */}
        <View style={styles.cardDate}>
          <Text style={styles.cardDay}>{item.dia}</Text>
          <Text style={styles.cardMonth}>{mes}</Text>
        </View>

        <View style={styles.cardInfoContainer}>
          {/* Avatar */}
          <View style={styles.cardAvatar}>
            <Text style={styles.avatarName}>{iniciales}</Text>
          </View>

          {/* Info */}
          <View style={styles.cardInfo}>
            <Text style={styles.cardName} numberOfLines={1}>
              <Text style={styles.cardNameBold}>{item.nombre} - </Text>
              <Text style={styles.cardNameNormal}>
                {item.empresa ? `${item.empresa}` : "Sin empresa"}
              </Text>
            </Text>
            <Text style={styles.cardDesc} numberOfLines={1}>
              {truncatedDescription || "Sin descripción"}
            </Text>
          </View>
        </View>

        {!item.viewed ? (
          <Animated.View style={[styles.viewedDot, { opacity }]} />
        ) : (
          <View style={[styles.badge, { backgroundColor: estadoColor }]}>
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
    gap: 12,
    flexDirection: "row",
    height: 85,
  },
  viewedCard: {
    borderColor: colors.border,
  },
  viewedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
  },
  cardDate: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.soft,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
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
  cardInfoContainer: {
    flexDirection: "row",
    gap: 15,
    flex: 1,
    alignItems: "center",
  },
  cardAvatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarName: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "700",
  },
  cardNameBold: {
    fontWeight: "700",
    color: colors.primary,
  },
  cardInfo: { gap: 2 },
  cardHour: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  cardName: {
    fontSize: 16,
  },
  cardNameNormal: { color: colors.secondaryText, fontSize: 14 },
  cardDesc: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  fullDescription: {
    backgroundColor: colors.soft,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    color: colors.secondaryText,
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: colors.warning,
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 10,
    fontWeight: "600",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
});
