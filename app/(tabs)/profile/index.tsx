import Header from '@/components/header';
import React from 'react';
import { Text, View } from 'react-native';
import { profileStyles as styles } from '../../../styles/profile.styles';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Perfil del usuario</Text>
    </View>
  );
}

