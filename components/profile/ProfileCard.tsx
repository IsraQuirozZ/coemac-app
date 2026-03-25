import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

interface Props {
  text: string;
  variant?: "username" | "speciality" | "birthdate" | "phone";
}

export default function ProfileCard({ text, variant }: Props) {
  const iconName =
    variant === "username"
      ? "person"
      : variant === "speciality"
        ? "briefcase"
        : variant === "birthdate"
          ? "calendar-clear"
          : variant === "phone"
            ? "call"
            : "person";
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileCardTop}>
        <Ionicons name={iconName} size={20} color={colors.primary} />
        <Text style={styles.profileCardTitle}>
          {variant === "username"
            ? "Username"
            : variant === "speciality"
              ? "Especialidad"
              : variant === "birthdate"
                ? "Fecha de Nacimiento"
                : variant === "phone"
                  ? "Teléfono"
                  : ""}
        </Text>
      </View>
      <Text style={styles.profileCardValue}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 15,
    gap: 10,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2, // Para Android
  },
  profileCardTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  profileCardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  profileCardValue: {
    fontSize: 14,
    color: colors.secondaryText,
    marginLeft: 30,
  },
});
