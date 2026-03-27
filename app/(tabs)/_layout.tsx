import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused }) => {
          let iconName: any;
          let label = "";

          switch (route.name) {
            case "dashboard":
              iconName = "home-sharp";
              label = "Dashboard";
              break;
            case "referencias/index":
              iconName = "people-sharp";
              label = "Referencias";
              break;
            case "reuniones/index":
              iconName = "calendar-clear";
              label = "Reuniones";
              break;
            case "agradecimientos/index":
              iconName = "heart";
              label = "GNC";
              break;
            case "incidencias/index":
              iconName = "alert-circle";
              label = "Incidencias";
              break;
            default:
              return null;
          }

          return (
            <View style={styles.item}>
              <Ionicons
                name={iconName}
                size={30}
                color={focused ? colors.light : colors.terciaryText}
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  {
                    color: focused ? colors.primary : colors.secondaryText,
                  },
                ]}
              >
                {label}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="referencias/index" />
      <Tabs.Screen name="reuniones/index" />
      <Tabs.Screen name="agradecimientos/index" />
      <Tabs.Screen name="incidencias/index" />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderTopWidth: 0,
    shadowColor: "#00000080",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    paddingHorizontal: 10,
    paddingTop: 12,
    flexDirection: "row",
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  label: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "500",
    width: "100%",
  },
});
