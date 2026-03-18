import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PLACEHOLDER, PRIMARY, styles } from '../styles/login.styles';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    // TODO: implement authentication logic
    console.log('Login with:', email, password);
  };

  const handleForgotPassword = () => {
    // TODO: navigate to forgot password screen
    console.log('Forgot password');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        {/* Campo Email — card independiente */}
        <View style={[styles.fieldCard, emailFocused && styles.fieldCardActive]}>
          <View style={styles.labelRow}>
            <Ionicons name="mail-outline" size={20} color={PRIMARY} style={styles.labelIcon} />
            <Text style={styles.label}>Email</Text>
          </View>
          <TextInput
            style={styles.inputBox}
            placeholder="correo@networking.com"
            placeholderTextColor={PLACEHOLDER}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>

        {/* Campo Password — card independiente */}
        <View style={[styles.fieldCard, passwordFocused && styles.fieldCardActive]}>
          <View style={styles.labelRow}>
            <Ionicons name="lock-closed-outline" size={20} color={PRIMARY} style={styles.labelIcon} />
            <Text style={styles.label}>Password</Text>
          </View>
          <View style={styles.inputPasswordWrapper}>
            <TextInput
              style={styles.inputPassword}
              placeholder="**********"
              placeholderTextColor={PLACEHOLDER}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={PLACEHOLDER}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot password */}
        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotContainer}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Botón Login */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Link a Register */}
        <View style={styles.registerRow}>
          <Text style={styles.registerLabel}>¿Nuevo por aquí?</Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}