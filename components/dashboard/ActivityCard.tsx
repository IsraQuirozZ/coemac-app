import { colors } from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type ActivityType = "referencia" | "reunion" | "agradecimiento";

type ActivityCardProps = {
  type: ActivityType;
  title: string;
  detail?: string;
  date: string;
  onDelete?: () => void;
  onPress?: () => void;
};

const detailLabels: Record<ActivityType, string> = {
  referencia: "Contacto referido:",
  reunion: "Fecha agendada:",
  agradecimiento: "Importe negocio:",
};

export default function ActivityCard({
  type,
  title,
  detail,
  date,
  onDelete,
  onPress,
}: ActivityCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <Text style={styles.subject}>{title}</Text>

        {detail ? (
          <Text style={styles.secondLine}>
            <Text style={styles.labelPrimary}>{detailLabels[type]}</Text>{" "}
            {detail}
          </Text>
        ) : null}

        <Text style={styles.date}>Fecha: {date}</Text>
      </View>

      {/* <View style={{ zIndex: 10 }}>
        <IconButton
          iconName="trash"
          iconSize={25}
          iconColor={colors.error}
          onPress={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        />
      </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    padding: 12,
  },
  cardContent: { gap: 10, flex: 1 },
  subject: { fontSize: 16, fontWeight: "500", color: colors.primary },
  labelPrimary: { color: colors.primaryText },
  secondLine: { fontSize: 14, color: colors.primaryText },
  date: { fontSize: 12, color: colors.secondaryText },
});
