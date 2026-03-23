import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colors } from "../../theme/colors";

type ButtonVariant = "primary" | "secondary" | "addBtn";

type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
} & Omit<PressableProps, "style">;

export default function Button({
  label,
  variant = "secondary",
  containerStyle,
  labelStyle,
  ...pressableProps
}: ButtonProps) {
  const buttonLabel = variant === "addBtn" ? "+" : label;

  return (
    <Pressable
      style={[styles.buttonBase, variantStyles[variant], containerStyle]}
      {...pressableProps}
    >
      <Text
        style={[
          styles.buttonTextBase,
          variant === "primary" && styles.primaryText,
          variant === "addBtn" && styles.addBtnText,
          labelStyle,
        ]}
      >
        {buttonLabel}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonTextBase: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  addBtnText: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: "600",
  },
  primaryText: {
    fontSize: 18,
    textAlign: "center",
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  secondary: {},
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
