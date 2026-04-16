import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const profileStyles = StyleSheet.create({
  profileHeader: {
    alignItems: "center",
    gap: 10,
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
  },
  errorText: {
    color: colors.error,
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
});
