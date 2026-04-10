import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 30,
    minHeight: "100%",
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
  },
  inputPassword: {
    flex: 1,
    fontSize: 14,
  },
  eyeButton: {
    paddingLeft: 8,
    justifyContent: "center",
  },
  registerRedirect: {
    gap: 10,
    alignItems: "center",
  },
  registerLabel: {
    color: colors.secondaryText,
  },
  registerLink: {
    color: colors.light,
    fontWeight: "700",
  },
});
