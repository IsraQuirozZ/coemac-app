import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 60,
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
  loginRedirect: {
    gap: 10,
    alignItems: "center",
  },
  loginLabel: {
    color: colors.secondaryText,
  },
  loginLink: {
    color: colors.light,
    fontWeight: "700",
  },
});
