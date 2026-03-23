import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const referenciasStyles = StyleSheet.create({
  referenciasContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 150,
    paddingBottom: 120,
    gap: 30,
  },

  referenciasText: {
    gap: 10,
  },

  referenciasTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },

  referenciasDescription: {
    fontSize: 16,
    color: colors.secondaryText,
  },

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  referenceCards: {
    gap: 20,
  },

  addButton: {
    position: "absolute",
    bottom: 110,
    right: 24,
    zIndex: 100,
  },
});
