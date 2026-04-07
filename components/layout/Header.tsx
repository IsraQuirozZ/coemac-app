import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { colors } from "../../theme/colors";

import { useWindowDimensions } from "react-native";

type HeaderProps = {
  title: string;
  initials?: string;
};

const Header: React.FC<HeaderProps> = ({ title, initials = "IQ" }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  return (
    <View style={styles.header__container}>
      <Svg
        height={130}
        width="100%"
        viewBox={`0 0 ${width} 120`}
        preserveAspectRatio="none"
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

        <TouchableOpacity
          style={styles.avatar}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header__container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 55,
    paddingBottom: 25,
    zIndex: 100,
  },

  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 120,
  },

  content: {
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
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
