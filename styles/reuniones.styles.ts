import { StyleSheet } from "react-native";

export const reunionesStyles = StyleSheet.create({
  // ── LISTA ──
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: { position: "absolute", bottom: 110, right: 24, zIndex: 100 },
  noDataText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
  // ── CARD exterior ──
  // Cambiada al componente ReunionCard para evitar conflictos con estilos del modal
});
