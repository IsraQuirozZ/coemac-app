import { StyleSheet } from "react-native";

export const referenciasStyles = StyleSheet.create({
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
  noDataText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
