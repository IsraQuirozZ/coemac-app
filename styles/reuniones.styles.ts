import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const reunionesStyles = StyleSheet.create({
  // ── LISTA ──
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 150,
    paddingBottom: 120,
    gap: 30,
    minHeight: "100%",
  },
  headerText: { gap: 10 },
  title: { fontSize: 28, fontWeight: "700", color: colors.primary },
  subtitle: { fontSize: 16, color: colors.secondaryText },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cards: { gap: 20 },
  addButton: { position: "absolute", bottom: 110, right: 24, zIndex: 100 },

  // ── CARD exterior ──
  // Cambiada al componente ReunionCard para evitar conflictos con estilos del modal

  // ── FORMULARIO ──
  formSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 60,
    gap: 30,
    minHeight: "100%",
  },

  formHeaderText: { gap: 10 },
  formTitle: { fontSize: 28, fontWeight: "700", color: colors.primary },
  formSubtitle: { fontSize: 16, color: colors.secondaryText },
  formFields: { gap: 20 },
  textArea: { minHeight: 100, textAlignVertical: "top", fontSize: 14 },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerDropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  pickerDropdownItem: { paddingVertical: 12, paddingHorizontal: 14 },
  pickerDropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateConfirmText: {
    color: colors.light,
    textAlign: "right",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 6,
  },
});
