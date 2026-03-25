import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type DashboardCardProps = {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  value: string | number;
  description: string;
  lastDate: string;
  fullWidth?: boolean;
};

export default function DashboardCard({
  iconName,
  value,
  description,
  lastDate,
  fullWidth = false,
}: DashboardCardProps) {
  return (
    <View style={[styles.card, fullWidth && styles.cardFull]}>
      <View style={styles.stats}>
        <Ionicons name={iconName} size={30} color={colors.primary} />
        <Text style={styles.statsNumber}>{value}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>Última: {lastDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47%",
    height: 115,
    backgroundColor: "white",
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2, // Para Android
    padding: 12,
    justifyContent: "space-between",
  },
  cardFull: {
    width: "100%",
  },
  stats: {
    flexDirection: "row",
    gap: 10,
    alignItems: "baseline",
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.primary,
  },
  description: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: colors.secondaryText,
  },
});
