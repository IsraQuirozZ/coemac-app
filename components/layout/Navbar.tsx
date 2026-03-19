import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";

type NavbarProps = {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.navbar__container}>
      <TouchableOpacity
        style={styles.navbar__link}
        onPress={() => onTabPress?.("dashboard")}
      >
        <Ionicons
          name="home-sharp"
          size={25}
          color={activeTab === "dashboard" ? colors.light : colors.terciaryText}
        />
        <Text
          style={[
            styles["navbar__link-text"],
            {
              color:
                activeTab === "dashboard"
                  ? colors.primary
                  : colors.secondaryText,
            },
          ]}
        >
          Dashboard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navbar__link}
        onPress={() => onTabPress?.("referencias")}
      >
        <Ionicons
          name="people-sharp"
          size={25}
          color={
            activeTab === "referencias" ? colors.light : colors.terciaryText
          }
        />
        <Text
          style={[
            styles["navbar__link-text"],
            {
              color:
                activeTab === "referencias"
                  ? colors.primary
                  : colors.secondaryText,
            },
          ]}
        >
          Referencias
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navbar__link}
        onPress={() => onTabPress?.("reuniones")}
      >
        <Ionicons
          name="calendar-clear"
          size={25}
          color={activeTab === "reuniones" ? colors.light : colors.terciaryText}
        />
        <Text
          style={[
            styles["navbar__link-text"],
            {
              color:
                activeTab === "reuniones"
                  ? colors.primary
                  : colors.secondaryText,
            },
          ]}
        >
          Reuniones
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navbar__link}
        onPress={() => onTabPress?.("agradecimientos")}
      >
        <Ionicons
          name="heart"
          size={25}
          color={
            activeTab === "agradecimientos" ? colors.light : colors.terciaryText
          }
        />
        <Text
          style={[
            styles["navbar__link-text"],
            {
              color:
                activeTab === "agradecimientos"
                  ? colors.primary
                  : colors.secondaryText,
            },
          ]}
        >
          GNC
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navbar__link}
        onPress={() => onTabPress?.("incidencias")}
      >
        <Ionicons
          name="alert-circle"
          size={25}
          color={
            activeTab === "incidencias" ? colors.light : colors.terciaryText
          }
        />
        <Text
          style={[
            styles["navbar__link-text"],
            {
              color:
                activeTab === "incidencias"
                  ? colors.primary
                  : colors.secondaryText,
            },
          ]}
        >
          Incidencias
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar__container: {
    height: 100,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    shadowColor: "#00000080",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    paddingHorizontal: 24,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 999,
  },

  navbar__link: {
    alignItems: "center",
    gap: 5,
  },

  "navbar__link-text": {
    fontSize: 10,
    fontWeight: "500",
  },
});
