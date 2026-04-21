import { colors } from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconButton from "../ui/IconButton";

export type ActivityType = "referencia" | "reunion" | "agradecimiento";

type ActivityCardProps = {
  type:        ActivityType;
  personName:  string;   // receptor (ref/agradecimiento) | invitado (reunion)
  detail:      string;   // nombreContacto (ref/agradecimiento) | fecha agendada (reunion)
  date:        string;   // createdAt formateado
  onDelete?:   () => void;
  onPress?:    () => void;
};

// Labels ajustados a los datos reales del schema
const contentByType: Record<ActivityType, { subjectLabel: string; detailLabel: string }> = {
  referencia:     { subjectLabel: "Referencia para:",    detailLabel: "Contacto referido:" },
  reunion:        { subjectLabel: "Reunión con:",        detailLabel: "Fecha agendada:"    },
  agradecimiento: { subjectLabel: "Agradecimiento a:",   detailLabel: "Contacto negocio:"  },
};

export default function ActivityCard({ type, personName, detail, date, onDelete, onPress }: ActivityCardProps) {
  const content = contentByType[type];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <Text style={styles.subject}>
          <Text style={styles.labelPrimary}>{content.subjectLabel}</Text> {personName}
        </Text>
        <Text style={styles.secondLine}>
          {content.detailLabel} {detail}
        </Text>
        <Text style={styles.date}>Fecha: {date}</Text>
      </View>

      <View style={{ zIndex: 10 }}>
        <IconButton
          iconName="trash"
          iconSize={25}
          iconColor={colors.error}
          onPress={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete();
          }}
        />
      </View>
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
  cardContent:  { gap: 10, flex: 1 },
  subject:      { fontSize: 16, fontWeight: "500", color: colors.primaryText },
  labelPrimary: { color: colors.primary },
  secondLine:   { fontSize: 14, color: colors.primaryText },
  date:         { fontSize: 12, color: colors.secondaryText },
});