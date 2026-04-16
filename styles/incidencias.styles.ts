import { Platform, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const incidenciasStyles = StyleSheet.create({
  cards: { gap: 20 },

  // ── CARDS ──
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    gap: 6,

    // ── SOMBRAS ADAPTADAS POR PLATAFORMA ──
    ...Platform.select({
      ios: {
        // Optimizado para tu iPhone
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
      android: {
        // Optimizado para dispositivos Android
        elevation: 2,
      },
      web: {
        // Esto limpia los warnings de tu consola en el navegador
        boxShadow: "0px 1px 4px rgba(0,0,0,0.04)",
      },
    }),
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardAsunto: { fontSize: 14, lineHeight: 20, flex: 1, paddingRight: 8 },
  cardAsuntoLabel: { fontWeight: "600", color: colors.primary },
  cardAsuntoValor: { color: colors.secondaryText },
  cardHora: { fontSize: 13, color: colors.primaryText, lineHeight: 18 },
  cardFecha: { fontSize: 12, color: colors.secondaryText },

  // ── BADGE DE ESTADO ──
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexShrink: 0,
  },
  badgePendiente: { backgroundColor: colors.terciaryText },
  badgeResuelta: { backgroundColor: colors.success },
  badgeTextPendiente: { fontSize: 10, fontWeight: "600", color: "white" },
  badgeTextResuelta: { fontSize: 10, fontWeight: "600", color: "white" },

  // ── FORMULARIO ──
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
  textArea: { minHeight: 120, textAlignVertical: "top", fontSize: 14 },
});