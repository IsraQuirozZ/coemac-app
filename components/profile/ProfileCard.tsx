import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { profileStyles as styles } from "../../styles/profile.styles";
import { colors } from "../../theme/colors";

interface Props {
  label: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function ProfileCard({ label, text, icon }: Props) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileCardTop}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={styles.profileCardTitle}>{label}</Text>
      </View>
      <Text style={styles.profileCardValue}>{text}</Text>
    </View>
  );
}