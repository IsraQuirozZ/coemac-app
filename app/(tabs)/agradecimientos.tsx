import Header from '@/components/header';
import { Text, View } from "react-native";
import { agradecimientosStyles as styles } from '../../styles/agradecimientos.styles';


export default function Agradecimientos() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Agradecimientos</Text>
    </View>
  );
}