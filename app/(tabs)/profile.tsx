import Header from "@/components/layout/Header";
import ProfileCard from "@/components/profile/ProfileCard";
import Badge from "@/components/ui/Badge";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import Button from "../../components/ui/Button";
import { profileStyles as styles } from "../../styles/profile.styles";

export default function Profile() {
  const user = {
    name: "Israel Quiroz",
    username: "israqzz",
    speciality: "Desarrollador Web",
    birthdate: "28/03/2001",
    phone: "+34 123 456 7890",
  };
  return (
    <View style={{ flex: 1 }}>
      <Header title="Perfil de Usuario"></Header>
      <ScrollView
        contentContainerStyle={[globalStyles.container]}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.profileHeader}>
          <Pressable
            style={styles.profileAvatarContainer}
            onPress={() => console.log("Editar avatar")}
          >
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>IQ</Text>
            </View>
            <View style={styles.avatarEditIcon}>
              <Ionicons name="pencil" size={15} color="white" />
            </View>
          </Pressable>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{user.name}</Text>
            <Pressable
              style={styles.nameEditIcon}
              onPress={() => console.log("Editar nombre")}
            >
              <Ionicons name="pencil" size={15} color="white" />
            </Pressable>
          </View>
          <Text style={styles.userName}>@{user.username}</Text>
          <Badge
            text={user.speciality}
            backgroundColor={colors.soft}
            textColor={colors.primary}
          />
        </View>
        <View style={styles.profileCards}>
          <ProfileCard text={`@${user.username}`} variant="username" />
          <ProfileCard text={user.speciality} variant="speciality" />
          <ProfileCard text={user.birthdate} variant="birthdate" />
          <ProfileCard text={user.phone} variant="phone" />
        </View>
        <Button
          label="Editar Perfil"
          variant="primary"
          onPress={() => console.log("Editar perfil")}
        />
      </ScrollView>
    </View>
  );
}
