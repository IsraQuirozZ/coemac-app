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

type ButtonVariant = "secondary";

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
  return (
    <Pressable
      style={[styles.buttonBase, variantStyles[variant], containerStyle]}
      {...pressableProps}
    >
      <Text style={[styles.buttonTextBase, labelStyle]}>{label}</Text>
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
});

const variantStyles = StyleSheet.create({
  secondary: {},
});
