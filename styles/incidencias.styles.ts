import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const incidenciasStyles = StyleSheet.create({
  // ── LISTA ──
  container: { backgroundColor: colors.background, paddingHorizontal: 24, paddingTop: 150, paddingBottom: 120, gap: 30 },
  headerText: { gap: 10 },
  title: { fontSize: 28, fontWeight: "700", color: colors.primary },
  subtitle: { fontSize: 16, color: colors.secondaryText },
  cards: { gap: 20 },
  addButton: { position: "absolute", bottom: 110, right: 24, zIndex: 100 },

  // ── CARD ──
  card: { backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: "#E2E2E2", paddingVertical: 14, paddingHorizontal: 16, shadowColor: "#000", shadowOpacity: 0.04, shadowOffset: { width: 0, height: 1 }, shadowRadius: 4, elevation: 1, gap: 6 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardAsunto: { fontSize: 14, lineHeight: 20, flex: 1, paddingRight: 8 },
  cardAsuntoLabel: { fontWeight: "400", color: colors.secondaryText },
  cardAsuntoValor: { fontWeight: "600", color: colors.primary },
  cardHora: { fontSize: 13, color: colors.secondaryText, lineHeight: 18 },
  cardFecha: { fontSize: 12, color: colors.secondaryText },

  // ── BADGE DE ESTADO ──
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, flexShrink: 0 },
  badgePendiente: { backgroundColor: "#E8E8E8" },
  badgeResuelta: { backgroundColor: colors.primary },
  badgeTextPendiente: { fontSize: 11.5, fontWeight: "600", color: "#666666" },
  badgeTextResuelta: { fontSize: 11.5, fontWeight: "600", color: "#FFFFFF" },

  // ── FORMULARIO ──
  formContainer: { backgroundColor: colors.background, paddingHorizontal: 24, paddingTop: 30, paddingBottom: 60, gap: 30 },
  formHeaderText: { gap: 10 },
  formTitle: { fontSize: 28, fontWeight: "700", color: colors.primary },
  formSubtitle: { fontSize: 16, color: colors.secondaryText },
  formFields: { gap: 20 },
  textArea: { minHeight: 120, textAlignVertical: "top", fontSize: 14 },
});