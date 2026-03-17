import Header from '@/components/header';
import { Text, View } from "react-native";
import { referenciasStyles as styles } from '../../styles/referencias.styles';


export default function Referencias() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Referencias</Text>
    </View>
  );
}