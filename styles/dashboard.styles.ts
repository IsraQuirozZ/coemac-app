import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const dashboardStyles = StyleSheet.create({
  dashboardCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
  },

  dashboardActivity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dashboardActivityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 15,
    zIndex: 200,
  },

  filterLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  filterWrapper: {
    position: "relative",
    zIndex: 300,
    elevation: 10, // Para Android
  },
  filterBox: {
    width: 200,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  filterText: {
    fontSize: 16,
    color: colors.secondaryText,
  },

  filterIcons: {
    justifyContent: "center",
    alignItems: "center",
  },

  dropdown: {
    zIndex: 400,
    position: "absolute",
    top: 45,
    left: 0,
    width: 200,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 15, // Para Android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  dropdownItem: {
    padding: 12,
  },

  dropdownText: {
    fontSize: 16,
    color: colors.secondaryText,
  },

  activityCards: {
    gap: 20,
  },
});
