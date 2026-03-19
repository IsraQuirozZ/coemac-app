import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";

export default function Referencias() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Referencias" />

      <Text>Referencias screen</Text>

      <Navbar
        activeTab="referencias"
        onTabPress={(tab) => {
          if (tab === "referencias") return;

          if (tab === "dashboard") router.push("/dashboard");
        }}
      />
    </View>
  );
}
