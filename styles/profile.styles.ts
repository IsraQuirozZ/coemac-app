import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const profileStyles = StyleSheet.create({
  profileHeader: {
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  profileAvatarContainer: {
    position: "relative",
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileAvatarText: {
    fontSize: 32,
    color: "white",
    fontWeight: "700",
  },
  avatarEditIcon: {
    height: 30,
    width: 30,
    backgroundColor: colors.primary,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 55,
    right: -5,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  nameEditIcon: {
    height: 25,
    width: 25,
    backgroundColor: colors.primary,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    color: colors.secondaryText,
    marginTop: 5,
  },
  profileCards: {
    gap: 20,
    // marginBottom: 30,
  },
  // Estilos específicos para la ProfileCard
  profileCard: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 15,
    gap: 8,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  profileCardTop: {
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: 30, // Alineación con el texto superior
  },
  errorText: {
    color: colors.error,
    textAlign: "center",
    marginBottom: 10,
  },
  nameInput: {
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    textAlign: "center",
  },
  nameButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  changePassword: {
    color: colors.info,
    textAlign: "center",
  },
});
