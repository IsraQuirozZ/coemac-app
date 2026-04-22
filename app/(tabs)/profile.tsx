import Header from "@/components/layout/Header";
import ProfileCard from "@/components/profile/ProfileCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { DatePickerSheet } from "@/components/ui/DatePickerSheet";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/hooks/useToast";
import { getProfile, updateProfile } from "@/services/profileService";
import { globalStyles } from "@/styles/globals.styles";
import { profileStyles as styles } from "@/styles/profile.styles";
import { colors } from "@/theme/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { showToast } = useToast();
  const { logout }    = useAuth();
  const navigation    = useNavigation();
  const dateSheetRef  = useRef<BottomSheet>(null);

  const [isAnySheetOpen, setIsAnySheetOpen] = useState(false);
  const [loading, setLoading]               = useState(true);
  const [isEditing, setIsEditing]           = useState(false);
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [isError, setIsError]               = useState(false);

  const [form, setForm] = useState({
    nombre: "", apellido: "", username: "",
    empresa: "", telefono: "", fechaNacimiento: new Date(),
  });
  const [saved, setSaved] = useState({ ...form });
  const [date,  setDate]  = useState(new Date());

  const [errors, setErrors] = useState({
    nombre: "", apellido: "", username: "",
    empresa: "", telefono: "", fechaNacimiento: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();
        const initial = {
          nombre:          data.nombre          || "",
          apellido:        data.apellido        || "",
          username:        data.username        || "",
          empresa:         data.empresa         || "",
          telefono:        data.telefono        || "",
          fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento) : new Date(),
        };
        setForm(initial);
        setSaved(initial);
        setDate(initial.fechaNacimiento);
      } catch {
        showToast("Error cargando el perfil", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const validateForm = () => {
    const newErrors: any = {};
    if (!form.nombre.trim()) newErrors.nombre = "Requerido";
    if (!form.apellido.trim()) newErrors.apellido = "Requerido";
    if (!form.username.trim()) newErrors.username = "Requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) { setIsError(true); return; }
    setIsSubmitting(true);
    try {
      const updated = await updateProfile({
        ...form,
        fechaNacimiento: form.fechaNacimiento.toISOString(),
      });
      setSaved({ ...form });
      setIsEditing(false);
      showToast("Perfil actualizado", "success");
    } catch (e: any) {
      showToast(e.message || "Error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const initials = `${saved.nombre} ${saved.apellido}`.split(" ").map(n => n[0]).join("").toUpperCase();

  if (loading) return <View style={globalStyles.container}><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Perfil" />
      <ScrollView contentContainerStyle={[globalStyles.container, { paddingBottom: 40 }]}>
        
        {/* Avatar Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>{initials}</Text></View>
          <Text style={styles.nameText}>{saved.nombre} {saved.apellido}</Text>
          <Text style={styles.userName}>@{saved.username}</Text>
          {saved.empresa && <Badge text={saved.empresa} backgroundColor={colors.soft} textColor={colors.primary} />}
        </View>

        <View style={styles.profileCards}>
          {isEditing ? (
            <>
              <FormField label="Nombre" icon="person-outline" error={errors.nombre}>
                <TextInput value={form.nombre} onChangeText={(v) => setForm({...form, nombre: v})} />
              </FormField>
              <FormField label="Apellido" icon="person-outline" error={errors.apellido}>
                <TextInput value={form.apellido} onChangeText={(v) => setForm({...form, apellido: v})} />
              </FormField>
              <FormField label="Username" icon="at-outline" error={errors.username}>
                <TextInput value={form.username} onChangeText={(v) => setForm({...form, username: v})} autoCapitalize="none" />
              </FormField>
              <FormField label="Empresa" icon="briefcase-outline">
                <TextInput value={form.empresa} onChangeText={(v) => setForm({...form, empresa: v})} />
              </FormField>
              <FormField label="Teléfono" icon="call-outline">
                <TextInput value={form.telefono} onChangeText={(v) => setForm({...form, telefono: v})} keyboardType="phone-pad" />
              </FormField>
            </>
          ) : (
            <>
              <ProfileCard label="Nombre" text={saved.nombre} icon="person-outline" />
              <ProfileCard label="Apellido" text={saved.apellido} icon="person-outline" />
              <ProfileCard label="Username" text={`@${saved.username}`} icon="at-outline" />
              <ProfileCard label="Empresa" text={saved.empresa || "No definida"} icon="briefcase-outline" />
              <ProfileCard label="Teléfono" text={saved.telefono || "No definido"} icon="call-outline" />
              <ProfileCard 
                label="Fecha de Nacimiento" 
                text={saved.fechaNacimiento.toLocaleDateString("es-ES")} 
                icon="calendar-clear-outline" 
              />
            </>
          )}
        </View>

        {isEditing ? (
          <View style={{ gap: 10 }}>
            <Button label={isSubmitting ? "Guardando..." : "Guardar"} onPress={handleSave} disabled={isSubmitting} />
            <Button label="Cancelar" variant="outline" onPress={() => setIsEditing(false)} />
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            <Button label="Editar Perfil" onPress={() => setIsEditing(true)} />
            <Button label="Cerrar Sesión" variant="danger" onPress={logout} />
          </View>
        )}
      </ScrollView>

      <DatePickerSheet
        ref={dateSheetRef}
        value={date}
        onConfirm={(d) => { setDate(d); setForm({...form, fechaNacimiento: d}); }}
        onOpenChange={setIsAnySheetOpen}
      />
    </View>
  );
}