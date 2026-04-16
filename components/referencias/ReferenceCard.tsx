import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type ReferenceCardProps = {
  referrer: string;
  position: string;
  number: string;
  email: string;
  member: string;
  referenceType: string;
  memberLabel: string;
  date: string;
  viewed: boolean;
};

export default function ReferenceCard({
  referrer,
  position,
  number,
  email,
  member,
  referenceType,
  memberLabel,
  date,
  viewed = false,
}: ReferenceCardProps) {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (viewed) return;

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={[styles.card, viewed && styles.viewedCard]}>
      <View style={styles.referrerContainer}>
        <Text style={styles.referrer}>
          {referrer} <Text style={styles.position}>- {position}</Text>
        </Text>
        {!viewed && <Animated.View style={[styles.viewedDot, { opacity }]} />}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Ionicons name="call" size={20} color={colors.primary} />
          <Text style={styles.infoText}>{number}</Text>
        </View>
        <View style={styles.info}>
          <Ionicons name="mail" size={20} color={colors.primary} />
          <Text style={styles.infoText}>{email}</Text>
        </View>
        <View style={styles.info}>
          <Ionicons name="person" size={20} color={colors.primary} />
          <Text style={styles.infoText}>
            {memberLabel}: {member}
          </Text>
        </View>
        <View style={styles.infoDate}>
          <View style={styles.info}>
            <Ionicons name="business" size={20} color={colors.primary} />
            <Text style={styles.infoText}>Tipo: {referenceType}</Text>
          </View>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2, // Para Android
    padding: 12,
    gap: 10,
  },
  viewedCard: {
    borderColor: colors.border,
  },
  referrerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  viewedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
  },
  referrer: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  position: {
    fontSize: 16,
    color: colors.secondaryText,
    fontWeight: "300",
  },
  infoContainer: {
    gap: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
  },
  infoText: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  infoDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 12,
    color: colors.secondaryText,
  },
});
