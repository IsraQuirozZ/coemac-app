import Header from "@/components/layout/Header";
import ProfileCard from "@/components/profile/ProfileCard";
import Badge from "@/components/ui/Badge";
import { DatePickerSheet } from "@/components/ui/DatePickerSheet";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/hooks/useToast";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { profileStyles as styles } from "../../styles/profile.styles";

export default function Profile() {
  const { showToast } = useToast();

  // MODAL DATEPICKER
  const dateSheetRef = useRef<BottomSheet>(null);

  const [isAnySheetOpen, setIsAnySheetOpen] = useState(false);
  const navigation = useNavigation();

  const user = {
    name: "Israel Quiroz",
    username: "israqzz",
    speciality: "Desarrollador Web",
    birthdate: new Date(2001, 4, 28),
    phone: "341234567890",
  };

  // FORM PARA EL NOMBRE
  const [name, setName] = useState(user.name);
  const [savedName, setSavedName] = useState(user.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameError, setNameError] = useState("");

  const validateName = () => {
    const trimmed = name.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!trimmed) {
      setNameError("El nombre es requerido.");
      return false;
    }

    if (trimmed.length < 3 || trimmed.length > 30) {
      setNameError("El nombre debe tener entre 3 y 30 caracteres.");
      return false;
    }

    if (!nameRegex.test(trimmed)) {
      setNameError("El nombre solo puede contener letras y espacios.");
      return false;
    }

    setNameError("");
    return true;
  };

  const handleSaveName = () => {
    if (!validateName()) return;

    setSavedName(name.trim());
    setIsEditingName(false);
    showToast("Nombre actualizado");
  };

  const handleCancelName = () => {
    setName(savedName);
    setIsEditingName(false);
    setNameError("");
  };

  // VALIDACION RESTO DE FORMULARIO
  const [date, setDate] = useState(user.birthdate);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    username: user.username,
    speciality: user.speciality,
    birthdate: user.birthdate,
    phone: user.phone,
  });
  const [saved, setSaved] = useState({ ...form });

  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    speciality: "",
    birthdate: "",
    phone: "",
  });

  const validateForm = () => {
    let newErrors: any = {};

    const username = form.username.trim();
    const speciality = form.speciality.trim();
    const birthdate = form.birthdate;
    const today = new Date();
    const phone = form.phone.trim();

    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Solo letras, números y guiones bajos
    const phoneRegex = /^\d{9,12}$/;
    const specialityRegex = /^[a-zA-Z\s]+$/; // Solo letras y espacios

    if (!username) {
      newErrors.username = "El username es requerido.";
    } else if (username.length < 3 || username.length > 20) {
      newErrors.username = "El username debe tener entre 3 y 20 caracteres.";
    } else if (!usernameRegex.test(username)) {
      newErrors.username =
        "El username solo puede contener letras, números y guiones bajos.";
    }

    if (!speciality) {
      newErrors.speciality = "La especialidad es requerida.";
    } else if (speciality.length < 3 || speciality.length > 20) {
      newErrors.speciality =
        "La especialidad debe tener entre 3 y 20 caracteres.";
    } else if (!specialityRegex.test(speciality)) {
      newErrors.speciality =
        "La especialidad solo puede contener letras y espacios.";
    }

    if (!birthdate) {
      newErrors.birthdate = "La fecha de nacimiento es requerida.";
    } else if (birthdate > today) {
      newErrors.birthdate = "La fecha de nacimiento no puede ser en el futuro.";
    }

    if (!phone) {
      newErrors.phone = "El teléfono es requerido.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone =
        "El teléfono debe ser un número válido con 9 a 12 dígitos.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSave = () => {
    const isValid = validateForm();

    if (!isValid) {
      setIsError(true);
      return;
    }
    setIsError(false);
    showToast("Perfil actualizado");
    setSaved({ ...form });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...saved });
    setIsEditing(false);
  };

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !isAnySheetOpen,
      tabBarStyle: isEditing
        ? { display: "none" }
        : {
            height: 90,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            shadowColor: "#00000080",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 5,
            paddingHorizontal: 10,
            paddingTop: 12,
            flexDirection: "row",
          },
    });
  }, [isAnySheetOpen, isEditing]);

  // LOGOUT
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Perfil de Usuario"></Header>
      <ScrollView
        contentContainerStyle={[globalStyles.container]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.profileHeader}>
          <Pressable
            style={styles.profileAvatarContainer}
            onPress={() => console.log("Editar avatar")}
          >
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>
                {savedName
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </Text>
            </View>
            {/* <View style={styles.avatarEditIcon}>
              <Ionicons name="pencil" size={15} color="white" />
            </View> */}
          </Pressable>
          <View style={styles.nameContainer}>
            {isEditingName ? (
              <View style={{ flex: 1 }}>
                <TextInput
                  value={name}
                  onChangeText={(val) => {
                    setName(val);
                    if (nameError) setNameError("");
                  }}
                  style={styles.nameInput}
                  autoFocus
                />

                {nameError ? (
                  <Text style={styles.errorText}>{nameError}</Text>
                ) : null}

                <View style={styles.nameButtonsContainer}>
                  <Button label="Guardar" onPress={handleSaveName} />
                  <Button label="Cancelar" onPress={handleCancelName} />
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.nameText}>{savedName}</Text>
                <Pressable
                  style={styles.nameEditIcon}
                  onPress={() => setIsEditingName(true)}
                >
                  <Ionicons name="pencil" size={15} color="white" />
                </Pressable>
              </>
            )}
          </View>
          <Text style={styles.userName}>@{saved.username}</Text>
          <Badge
            text={saved.speciality}
            backgroundColor={colors.soft}
            textColor={colors.primary}
          />
        </View>

        <View style={styles.profileCards}>
          {isEditing ? (
            <>
              <FormField
                label="Username"
                icon="person-outline"
                error={errors.username}
              >
                <TextInput
                  value={form.username}
                  onChangeText={(val) => {
                    setForm({ ...form, username: val });
                    clearError("username");
                  }}
                  autoCapitalize="none"
                  placeholder="Username"
                />
              </FormField>
              <FormField
                label="Especialidad"
                icon="briefcase-outline"
                error={errors.speciality}
              >
                <TextInput
                  value={form.speciality}
                  onChangeText={(val) => {
                    setForm({ ...form, speciality: val });
                    clearError("speciality");
                  }}
                  placeholder="Especialidad"
                />
              </FormField>
              <FormField
                label="Fecha de nacimiento"
                icon="calendar-clear"
                error={errors.birthdate}
              >
                <TouchableOpacity
                  onPress={() => {
                    dateSheetRef.current?.snapToIndex(0);
                  }}
                >
                  <Text>
                    {date.toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </TouchableOpacity>
              </FormField>
              <FormField
                label="Teléfono"
                icon="call-outline"
                error={errors.phone}
              >
                <TextInput
                  value={form.phone}
                  onChangeText={(val) => {
                    setForm({ ...form, phone: val });
                    clearError("phone");
                  }}
                  placeholder="+34 000 000 000"
                  keyboardType="phone-pad"
                />
              </FormField>
            </>
          ) : (
            <>
              <ProfileCard text={`@${saved.username}`} variant="username" />
              <ProfileCard text={saved.speciality} variant="speciality" />
              <ProfileCard
                text={saved.birthdate.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                variant="birthdate"
              />
              <ProfileCard text={saved.phone} variant="phone" />
            </>
          )}
        </View>

        {isEditing && isError && (
          <Text style={styles.errorText}>
            Por favor corrige los errores antes de guardar.
          </Text>
        )}

        {isEditing ? (
          <View style={{ gap: 10 }}>
            <Button label="Guardar" variant="primary" onPress={handleSave} />
            <Button label="Cancelar" variant="primary" onPress={handleCancel} />
          </View>
        ) : (
          <Button
            label="Editar Perfil"
            variant="primary"
            onPress={() => setIsEditing(true)}
          />
        )}
        <Button
          label="Cerrar Sesión"
          variant="danger"
          onPress={() => {
            logout();
            showToast("Sesión cerrada", "info");
          }}
        />
      </ScrollView>
      {/* BOTTOM SHEET DE DATEPICKER */}
      <DatePickerSheet
        ref={dateSheetRef}
        value={date}
        onConfirm={(selectedDate) => {
          clearError("birthdate");
          setDate(selectedDate);
          setForm({
            ...form,
            birthdate: selectedDate,
          });
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />
    </View>
  );
}
