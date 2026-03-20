import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const referenciaCrearStyles = StyleSheet.create({
  referenciasContainer: {
    // flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 60,
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
  formContainer: {
    gap: 20,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 14,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 20,
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#198754",
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#198754",
  },
});
