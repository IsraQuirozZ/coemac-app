import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const detalleReunionStyles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    gap: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  contactContainer: {
    gap: 5,
  },
  cargoContainer: {
    fontSize: 18,
    color: colors.secondaryText,
  },
  infoContainer: {
    gap: 15,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  infoText: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  estadoPill: {
    fontSize: 16,
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: colors.soft,
    width: 120,
    textAlign: "center",
  },
  infoDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  descripcion: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.primary,
  },
  verMas: {
    color: colors.primary,
    marginTop: 10,
    fontWeight: "600",
    alignSelf: "flex-end",
  },

  //   BOTONES
  actionsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 120,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    textAlign: "center",
    gap: 10,
  },

  editButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.light,
  },

  deleteButton: {
    flex: 1,
    textAlign: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.error,
    color: "white",
    fontWeight: "600",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
