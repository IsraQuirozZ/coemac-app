import { StyleSheet, View } from "react-native";
import { colors } from "../../theme/colors";

export default function HandlerIndicator() {
  return (
    <View style={styles.handlerContainer}>
      <View style={styles.handlerIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  handlerContainer: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  handlerIndicator: {
    width: 40,
    height: 5,
    backgroundColor: colors.handlerIndicator,
    borderRadius: 2.5,
    alignSelf: "center",
  },
});
