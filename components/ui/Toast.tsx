import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
};

export default function Toast({ message, type = "success" }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // entrada
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // salida
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const iconName = {
    success: "checkmark-circle",
    error: "close-circle",
    warning: "alert-circle",
    info: "information-circle",
  } as const;

  return (
    <Animated.View
      style={[
        styles.container,
        styles[type],
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <Ionicons name={iconName[type]} size={24} color="white" />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 50,
    zIndex: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    elevation: 999,
  },

  text: {
    color: "white",
    fontWeight: "500",
  },

  success: {
    backgroundColor: colors.success,
  },

  error: {
    backgroundColor: colors.error,
  },

  warning: {
    backgroundColor: colors.warning,
  },

  info: {
    backgroundColor: colors.info,
  },
});
