import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import IconButton from "../ui/IconButton";

export type ActivityType = "referencia" | "reunion" | "agradecimiento";

type ActivityCardProps = {
  type: ActivityType;
  personName: string;
  detail: string;
  date: string;
  onDelete?: () => void;
};

const contentByType: Record<
  ActivityType,
  { subjectLabel: string; detailLabel: string }
> = {
  referencia: {
    subjectLabel: "Referencia para:",
    detailLabel: "Contacto (Ref):",
  },
  reunion: {
    subjectLabel: "Reunión con:",
    detailLabel: "Hora:",
  },
  agradecimiento: {
    subjectLabel: "Agradecimiento para:",
    detailLabel: "Motivo:",
  },
};

export default function ActivityCard({
  type,
  personName,
  detail,
  date,
  onDelete,
}: ActivityCardProps) {
  const content = contentByType[type];

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.subject}>
          <Text style={styles.labelPrimary}>{content.subjectLabel}</Text>{" "}
          {personName}
        </Text>
        <Text style={styles.secondLine}>
          {content.detailLabel} {detail}
        </Text>
        <Text style={styles.date}>Fecha: {date}</Text>
      </View>

      <IconButton
        iconName="trash"
        iconSize={25}
        iconColor={colors.error}
        onPress={onDelete}
      />
    </View>
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
    elevation: 2, // Para Android
    padding: 12,
  },
  cardContent: {
    gap: 10,
  },
  subject: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primaryText,
  },
  labelPrimary: {
    color: colors.primary,
  },
  secondLine: {
    fontSize: 14,
    color: colors.primaryText,
  },
  date: {
    fontSize: 12,
    color: colors.secondaryText,
  },
});
