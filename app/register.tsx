import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PLACEHOLDER, PRIMARY, styles } from "../styles/register.styles";

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [repeatFocused, setRepeatFocused] = useState(false);

  const handleRegister = () => {
    // TODO: implement registration logic
    console.log("Register with:", username, email, password, repeatPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>¡Crea tu cuenta!</Text>
          <Text style={styles.subtitle}>Regístrate para comenzar</Text>
        </View>

        {/* Campo Username — card independiente */}
        <View
          style={[styles.fieldCard, usernameFocused && styles.fieldCardActive]}
        >
          <View style={styles.labelRow}>
            <Ionicons
              name="person-outline"
              size={20}
              color={PRIMARY}
              style={styles.labelIcon}
            />
            <Text style={styles.label}>Username</Text>
          </View>
          <TextInput
            style={styles.inputBox}
            placeholder="Tu nombre"
            placeholderTextColor={PLACEHOLDER}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
          />
        </View>

        {/* Campo Email — card independiente */}
        <View
          style={[styles.fieldCard, emailFocused && styles.fieldCardActive]}
        >
          <View style={styles.labelRow}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={PRIMARY}
              style={styles.labelIcon}
            />
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
        <View
          style={[styles.fieldCard, passwordFocused && styles.fieldCardActive]}
        >
          <View style={styles.labelRow}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={PRIMARY}
              style={styles.labelIcon}
            />
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
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={PLACEHOLDER}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Campo Repeat Password — card independiente */}
        <View
          style={[styles.fieldCard, repeatFocused && styles.fieldCardActive]}
        >
          <View style={styles.labelRow}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={PRIMARY}
              style={styles.labelIcon}
            />
            <Text style={styles.label}>Repeat password</Text>
          </View>
          <View style={styles.inputPasswordWrapper}>
            <TextInput
              style={styles.inputPassword}
              placeholder="**********"
              placeholderTextColor={PLACEHOLDER}
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              secureTextEntry={!showRepeatPassword}
              autoCapitalize="none"
              onFocus={() => setRepeatFocused(true)}
              onBlur={() => setRepeatFocused(false)}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              <Ionicons
                name={showRepeatPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={PLACEHOLDER}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón Registrarse */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Link a Login */}
        <View style={styles.loginRow}>
          <Text style={styles.loginLabel}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
