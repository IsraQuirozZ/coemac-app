import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 60,
    gap: 30,
    minHeight: "100%",
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  // Contenedor para la vista cuando el correo ya se envió
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 40,
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0fdf4", // Un verde muy suave para éxito
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  // Enlace para volver atrás
  backToLoginContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  backToLoginLink: {
    color: colors.light, // Usando el color que tienes para enlaces en Register
    fontWeight: "700",
    fontSize: 15,
  },
  // Estilo específico para inputs de contraseña en la pantalla de Reset
  inputPassword: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
});