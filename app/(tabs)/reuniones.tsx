import Header from '@/components/header';
import { Text, View } from "react-native";
import { reunionesStyles as styles } from '../../styles/reuniones.styles';


export default function Reuniones() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Reuniones</Text>
    </View>
  );
}