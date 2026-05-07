import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const st = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 60,
    gap: 20,
  },

  headerText: { gap: 4 },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: -0.4,
  },

  subtitle: {
    fontSize: 14,
    color: colors.secondaryText,
  },

  list: { gap: 12 },

  empty: {
    color: colors.secondaryText,
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
  },

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Card ──
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },

  // Avatar circular
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  avatarAdmin: {
    backgroundColor: "#2A7A64",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  cardContent: { flex: 1, gap: 3 },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  cardName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    flex: 1,
  },

  cardEmail: {
    fontSize: 12.5,
    color: colors.secondaryText,
  },

  cardEmpresa: {
    fontSize: 12,
    color: colors.secondaryText,
    fontStyle: "italic",
  },

  // Badge rol
  rolBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
    flexShrink: 0,
  },

  rolBadgeAdmin: {
    backgroundColor: "#D4EBE3",
  },

  rolBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666666",
  },

  rolBadgeTextAdmin: {
    color: colors.primary,
  },
});
