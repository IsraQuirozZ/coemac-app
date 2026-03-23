import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
});
