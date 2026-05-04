import { Ionicons } from "@expo/vector-icons";
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

type ButtonVariant = "primary" | "secondary" | "add" | "close" | "danger" | "outline"; 

type ButtonProps = {
  label?: string;
  variant?: ButtonVariant;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
} & Omit<PressableProps, "style">;

export default function Button({
  label,
  variant = "primary",
  containerStyle,
  labelStyle,
  ...props
}: ButtonProps) {
  const isIconButton = variant === "add" || variant === "close";

  return (
    <Pressable
      style={[styles.base, variantStyles[variant], containerStyle]}
      {...props}
    >
      {isIconButton ? (
        <Ionicons
          name={iconByVariant[variant]}
          size={iconSizeByVariant[variant]}
          color="white"
        />
      ) : (
        <Text style={[styles.textBase, textVariantStyles[variant], labelStyle]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.light,
  },

  textBase: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    height: 50,
  },

  secondary: {
    height: 45,
  },

  add: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  close: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  danger: {
    height: 50,
    backgroundColor: colors.error,
  },
  outline: {
  height: 50,
  backgroundColor: "transparent",
  borderWidth: 2,
  borderColor: colors.primary,
},
});

const textVariantStyles = StyleSheet.create({
  primary: {
    fontSize: 18,
    fontWeight: "600",
  },
  secondary: {},
  add: {},
  close: {},
  danger: {
    fontSize: 18,
    fontWeight: "600",
  },
  outline: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "600",
  },
});

const iconByVariant = {
  add: "add",
  close: "close",
} as const;

const iconSizeByVariant = {
  add: 40,
  close: 40,
} as const;
