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

type ButtonPosition = "first" | "middle" | "last";

type FilterButtonProps = {
  label: string;
  position?: ButtonPosition;
  active?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
} & Omit<PressableProps, "style">;

export default function FilterButton({
  label,
  position = "first",
  active = false,
  containerStyle,
  labelStyle,
  ...pressableProps
}: FilterButtonProps) {
  return (
    <Pressable
      style={[
        styles.buttonBase,
        positionStyles[position],
        active && styles.activeButton,
        containerStyle,
      ]}
      {...pressableProps}
    >
      <Text
        style={[
          styles.buttonTextBase,
          active && styles.activeButtonText,
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    backgroundColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 0,
    minWidth: 100,
    alignItems: "center",
  },
  buttonTextBase: {
    color: colors.secondaryText,
    fontSize: 14,
    fontWeight: "500",
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  activeButtonText: {
    color: "white",
  },
});

const positionStyles = StyleSheet.create({
  first: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  middle: {
    borderLeftColor: colors.terciaryText,
    borderLeftWidth: 2,
  },
  last: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderLeftColor: colors.terciaryText,
    borderLeftWidth: 2,
  },
});
