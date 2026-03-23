import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const crearReferenciaStyles = StyleSheet.create({
  referenciasContainer: {
    // flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 60,
    gap: 30,
  },

  referenciasText: {
    gap: 10,
  },

  referenciasTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },

  referenciasDescription: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  formContainer: {
    gap: 20,
  },
  formSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membersDropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 14,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 20,
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#198754",
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#198754",
  },
});

export const bottomSheetStyles = {
  background: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    gap: 15,
    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // sombra Android
    elevation: 10,
  },
  handleIndicator: {
    width: 40,
    backgroundColor: "#ccc",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 8,
    marginVertical: 12,
    color: colors.primaryText,
  },

  item: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemSelected: {
    backgroundColor: colors.soft,
  },

  text: {
    fontSize: 15,
    color: colors.primaryText,
  },

  textSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
};
