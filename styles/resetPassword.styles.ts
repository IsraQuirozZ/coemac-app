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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    color: colors.light,
    fontWeight: '600',
  },
});