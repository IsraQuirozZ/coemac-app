import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const informeStyles = StyleSheet.create({
  metricsBox: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  metricsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
  },
  metricText: {
    fontSize: 14,
    color: colors.primaryText,
  },
  section: { gap: 10 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: colors.primary },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    padding: 14,
    gap: 8,
  },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  rowLabel: { fontSize: 13, color: colors.secondaryText, flex: 1 },
  rowValue: {
    fontSize: 13,
    color: colors.primaryText,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  empty: { color: colors.secondaryText, fontSize: 13, fontStyle: "italic" },
  footer: {
    padding: 20,
    paddingBottom: 36,
    backgroundColor: colors.background,
  },
  exportBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  exportBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
