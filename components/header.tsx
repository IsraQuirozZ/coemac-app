import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/dashboard')}>
        <Text style={styles.link}>🏠 Inicio</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Mi App</Text>

      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Text style={styles.link}>👤 Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#fff',
    fontSize: 16,
  },
});