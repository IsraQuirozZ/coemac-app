import { agradecimientosStyles as styles } from "@/styles/agradecimientos.styles";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function EnvioAgradecimiento() {
  const router = useRouter();

  const handleDone = () => {
    router.dismissAll();
  };

  const handleSendAnother = () => {
    router.replace("/(modals)/crearAgradecimiento");
  };

  return (
    <View style={styles.successOverlay}>
      <View style={styles.successCard}>

        <Text style={styles.successTitle}>¡Gracias por tu Feedback!</Text>
        <Text style={styles.successSubtitle}>
          Tu reconocimiento ha sido enviado con éxito.
        </Text>

        <View style={styles.successInfo}>
          <View style={styles.successInfoItem}>
            <FontAwesome5 name="thumbs-up" size={30} color="#1A5C4B" />
            <Text style={styles.successInfoLabel}>Has elogiado a:</Text>
            <Text style={styles.successInfoValue}>Usuario</Text>
          </View>
          <View style={styles.successInfoItem}>
            <MaterialCommunityIcons name="chat" size={30} color="#1A5C4B" />
            <Text style={styles.successInfoLabel}>Motivo:</Text>
            <Text style={styles.successInfoValue}>Negocio cerrado</Text>
          </View>
        </View>

        <Text style={styles.successFooterText}>
          Tu feedback contribuye a fortalecer nuestra comunidad.
        </Text>

        <TouchableOpacity style={styles.successButton} onPress={handleDone} activeOpacity={0.85}>
          <Text style={styles.successButtonText}>Listo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSendAnother} activeOpacity={0.7}>
          <Text style={styles.successLinkText}>Enviar otro agradecimiento</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}