import { StyleSheet } from "react-native";

export const crearReferenciaStyles = StyleSheet.create({
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
