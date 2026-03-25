import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 150,
    paddingBottom: 120,
    gap: 30,
    minHeight: "100%",
  },
  containerText: {
    gap: 10,
  },
  containerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  containerDescription: {
    fontSize: 16,
    color: colors.secondaryText,
  },
});
