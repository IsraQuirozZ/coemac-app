import Header from '@/components/header';
import { Text, View } from "react-native";
import { incidenciasStyles as styles } from '../../styles/incidencias.styles';


export default function Incidencias() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Incidencias</Text>
    </View>
  );
}