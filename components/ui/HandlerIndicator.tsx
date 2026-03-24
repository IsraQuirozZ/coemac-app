import { StyleSheet, View } from "react-native";
import { colors } from "../../theme/colors";

export default function HandlerIndicator() {
  return <View style={styles.handlerIndicator} />;
}

const styles = StyleSheet.create({
  handlerIndicator: {
    width: 40,
    height: 5,
    backgroundColor: colors.handlerIndicator,
    borderRadius: 2.5,
    alignSelf: "center",
  },
});
