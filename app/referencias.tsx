import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import Header from "../components/layout/Header";

export default function Referencias() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Referencias" />

      <Text>Referencias screen</Text>
    </View>
  );
}
