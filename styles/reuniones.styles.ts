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
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
    gap: 12,
  },

  // ── Columna fecha (dos bloques apilados) ──
  cardDateCol: { width: 56, flexShrink: 0, gap: 4 },
  cardDateTop: {
    backgroundColor: "#C8DDD6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 4,
  },
  cardDay: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.primary,
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  cardMonth: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    lineHeight: 15,
  },
  cardDateBottom: {
    backgroundColor: "#EDF4F1",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  cardHourSmall: { fontSize: 11.5, fontWeight: "500", color: "#8AADA3" },

  // ── Avatar + info ──
  cardAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardInfo: { flex: 1, gap: 2 },
  cardHour: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primaryText,
    lineHeight: 18,
  },
  cardName: { fontSize: 14.5, lineHeight: 20 },
  cardNameBold: { fontWeight: "700", color: colors.primaryText },
  cardNameNormal: { fontWeight: "400", color: colors.primaryText },
  cardDesc: {
    fontSize: 12.5,
    fontWeight: "400",
    color: colors.secondaryText,
    lineHeight: 17,
  },
  cardChevron: { flexShrink: 0, marginLeft: 2 },

  // ── FORMULARIO ──
  formSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 60,
    gap: 30,
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
