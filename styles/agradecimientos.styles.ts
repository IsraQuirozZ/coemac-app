import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const agradecimientosStyles = StyleSheet.create({
  // ── LISTA ──
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cards: { gap: 20 },
  addButton: { position: "absolute", bottom: 110, right: 24, zIndex: 100 },

  // ── CARD ──
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
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
  cardAmountBadge: {
    width: 66,
    height: 66,
    borderRadius: 13,
    backgroundColor: colors.soft,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardAmountText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
  },
  cardContent: { flex: 1, gap: 5 },
  cardTitle: { fontSize: 14, lineHeight: 20 },
  cardUser: { fontWeight: "700", color: colors.primary },
  cardTitleSuffix: { color: colors.secondaryText },
  cardMotivo: { fontSize: 13, color: colors.primaryText },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 3,
  },
  cardCantidad: {
    fontSize: 12,

    color: colors.secondaryText,
  },
  cardFecha: { fontSize: 12, color: colors.secondaryText },

  // ── FORMULARIO ──

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

  // ── RADIO BUTTONS ──
  radioContainer: { flexDirection: "row", gap: 20 },
  radioItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  // ── ENVÍO ──
  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.50)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  successCard: {
    backgroundColor: colors.background,
    borderRadius: 22,
    padding: 28,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 14,
    gap: 16,
  },
  successTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  successSubtitle: {
    fontSize: 16,

    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 22,
  },
  successInfo: { flexDirection: "row", gap: 12, width: "100%" },
  successInfoItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
    gap: 6,
    backgroundColor: colors.background,
  },
  successInfoLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
  },
  successInfoValue: {
    fontSize: 13.5,
    fontWeight: "600",
    color: colors.primaryText,
    textAlign: "center",
  },
  successFooterText: {
    fontSize: 14,

    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 20,
  },
  successButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    width: "100%",
    shadowColor: colors.primary,
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  successButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  successLinkText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  noDataText: { color: colors.secondaryText, textAlign: "center", marginTop: 20 }
});
