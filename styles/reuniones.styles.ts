import { StyleSheet } from "react-native";

export const reunionesStyles = StyleSheet.create({
  // ── LISTA ──
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: { position: "absolute", bottom: 110, right: 24, zIndex: 100 },

  // ── CARD exterior ──
  // Cambiada al componente ReunionCard para evitar conflictos con estilos del modal
});
