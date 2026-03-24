import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const crearReferenciaStyles = StyleSheet.create({
  referenciasContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 60,
    gap: 30,
  },
  handlerIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
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
  formSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membersDropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
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
