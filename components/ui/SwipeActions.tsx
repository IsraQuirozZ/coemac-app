import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

type Action = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
};

type Props = {
  id: string;
  children: React.ReactNode;
  actions: Action[];
  onOpen?: (id: string) => void;
  registerRef?: (id: string, ref: Swipeable | null) => void;
};

export default function SwipeActions({
  id,
  children,
  actions,
  onOpen,
  registerRef,
}: Props) {
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = () => {
    return (
      <View style={styles.container}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: action.color }]}
            onPress={action.onPress}
          >
            <Ionicons name={action.icon} size={20} color="#fff" />
            <Text style={styles.text}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Swipeable
      ref={(ref) => {
        swipeableRef.current = ref;
        registerRef?.(id, ref);
      }}
      onSwipeableOpen={() => onOpen?.(id)}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "100%",
    // alignItems: "center",
    gap: 10,
    paddingLeft: 10,
  },
  button: {
    width: 80,
    // height: 80,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
