import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Path, Svg } from "react-native-svg";
import { colors } from "../../theme/colors";

const { width } = Dimensions.get("window");

type HeaderProps = {
  title: string;
  onNotificationPress?: () => void;
  initials?: string;
};

const Header: React.FC<HeaderProps> = ({
  title,
  onNotificationPress,
  initials = "IQ",
}) => {
  return (
    <View style={styles.header__container}>
      <Svg
        height={120}
        width="100%"
        viewBox={`0 0 ${width} 120`}
        style={styles.svg}
      >
        <Path
          d={`
            M0 120
            C0 120 ${width * 0.1} 95 ${width * 0.25} 95
            C${width * 0.4} 95 ${width * 0.5} 120 ${width * 0.65} 120
            C${width * 0.85} 120 ${width} 83 ${width} 83
            L${width} 0
            L0 0
            Z
            `}
          fill={colors.light}
        />
        <Path
          d={`
            M0 120
            C0 120 ${width * 0.1} 95 ${width * 0.25} 95
            C${width * 0.35} 95 ${width * 0.5} 115 ${width * 0.6} 115
            C${width * 0.85} 120 ${width} 45 ${width} 45
            L${width} 0
            L0 0
            Z
            `}
          fill={colors.primary}
        />
      </Svg>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightSection}>
          {/* Notificaciones */}
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onNotificationPress}
          >
            <Ionicons name="notifications-outline" size={25} color="#fff" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header__container: {
    height: 120,
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 25,
    backgroundColor: colors.background,
  },

  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  content: {
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  iconContainer: {
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: 1,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: colors.error,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "bold",
  },
});
