import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

type IconButtonProps = {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  iconSize?: number;
  iconColor: string;
  containerStyle?: StyleProp<ViewStyle>;
} & Omit<PressableProps, "style">;

export default function IconButton({
  iconName,
  iconSize = 24,
  iconColor,
  containerStyle,
  hitSlop = 8,
  ...pressableProps
}: IconButtonProps) {
  return (
    <Pressable
      style={[styles.button, containerStyle]}
      hitSlop={hitSlop}
      {...pressableProps}
    >
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
