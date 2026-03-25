import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

interface Props {
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function Badge({
  text,
  backgroundColor = colors.primary,
  textColor = "white",
}: Props) {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    // alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
