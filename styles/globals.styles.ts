import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 150,
    paddingBottom: 120,
    gap: 30,
    minHeight: "100%",
  },
  containerText: {
    gap: 10,
  },
  containerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  containerDescription: {
    fontSize: 16,
    color: colors.secondaryText,
  },

  // FORMULARIOS
  formContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 60,
    gap: 30,
    minHeight: "100%",
  },
  formFields: {
    gap: 20,
  },
  formSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textArea: { minHeight: 100, textAlignVertical: "top", fontSize: 14 },

  // BOTÓN AGREGAR
  addButton: {
    position: "absolute",
    bottom: 110,
    right: 24,
    zIndex: 100,
  },

  // DIVIDER
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
