import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type FormFieldProps = {
  label: string;
  icon: any;
  children: ReactNode;
  date?: boolean;
};

export default function FormField({
  label,
  icon,
  children,
  date = false,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  let childrenWithProps = children;

  if (React.isValidElement(children)) {
    childrenWithProps = React.cloneElement(children, {
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
    } as any);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={styles.label}>{label}</Text>
      </View>

      {date ? (
        <View>{children}</View>
      ) : (
        <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
          {childrenWithProps}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputFocused: {
    borderColor: colors.light,
  },
  dateInputContainer: {},
});
