import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Dashboard" />
      <Navbar
        activeTab="dashboard"
        onTabPress={(tab) => {
          if (tab === "dashboard") return;
          if (tab === "referencias") return router.push("/referencias");
          if (tab === "reuniones") return router.push("/reuniones");
          if (tab === "agradecimientos") return router.push("/agradecimientos");
          if (tab === "incidencias") return router.push("/incidencias");
        }}
      />
    </View>
  );
}
