import { StyleSheet } from 'react-native';

export const agradecimientosStyles = StyleSheet.create({
  container: {
    flex: 1,                // Ocupa toda la pantalla
    backgroundColor: 'white', // Fondo visible
    paddingTop: 40,         // Espacio adicional para el header
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: '#666',
  },
});