import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type FormFieldProps = {
  label: string;
  icon: any;
  children: ReactNode;
  error?: string;
  password?: boolean;
};

export default function FormField({
  label,
  icon,
  children,
  error,
  password = false,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (
      child.type === "TextInput" ||
      (child.props as any)?.onChangeText !== undefined
    ) {
      return React.cloneElement(child, {
        onFocus: (e: any) => {
          setIsFocused(true);
          (child.props as any).onFocus?.(e);
        },
        onBlur: (e: any) => {
          setIsFocused(false);
          (child.props as any).onBlur?.(e);
        },
      } as any);
    }

    return child;
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* INPUT */}
      <View
        style={[
          styles.inputContainer,
          password && styles.passwordInputContainer,
          error ? styles.inputError : isFocused && styles.inputFocused,
        ]}
      >
        {childrenWithProps}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    paddingVertical: 12,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputFocused: {
    borderColor: colors.light,
  },
  dateInputContainer: {},
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginLeft: 2,
  },
});
