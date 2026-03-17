import Header from '@/components/header';
import { Text, View } from 'react-native';
import { dashboardStyles as styles } from '../../styles/dashboard.styles';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Pantalla de dashboard</Text>
      <Text style={styles.subtitle}>
        Aquí puedes poner la información principal de tu dashboard.
      </Text>
    </View>
  );
}