import Button from "@/components/ui/Button";
import { DatePickerSheet } from "@/components/ui/DatePickerSheet";
import FormField from "@/components/ui/FormField";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { MemberSelectSheet } from "@/components/ui/MemberSelectSheet";
import { crearAgradecimiento } from "@/services/agradeciminetoService";
import { getUsuarios } from "@/services/usuarioService";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "../../hooks/useToast";

export default function CrearAgradecimiento() {
  const [submitting, setSubmitting] = useState(false);

  // ── Miembros ────────────────────────────────────────────────────────────────
  const [members, setMembers]             = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const memberSheetRef = useRef<BottomSheet>(null);
  const dateSheetRef   = useRef<BottomSheet>(null);

  const [isAnySheetOpen, setIsAnySheetOpen] = useState(false);
  const navigation = useNavigation();
  const router     = useRouter();
  const { showToast } = useToast();

  // Deshabilitar swipe-to-close del modal padre cuando un sheet está abierto
  useEffect(() => {
    navigation.setOptions({ gestureEnabled: !isAnySheetOpen });
  }, [isAnySheetOpen]);

  // Carga los usuarios de la BD al montar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsuarios();
        setMembers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const memberOptions = members.map((m) => ({
    id:      m.id,
    name:    `${m.nombre} ${m.apellido}`,
    company: m.empresa || "Sin empresa",
  }));

  // ── Form state ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    miembro:          null as string | null,
    contactoReferido: "",
    importe:          "",
    fechaNegocio:     new Date(),
  });

  const [isError, setIsError] = useState(false);
  const [errors, setErrors]   = useState({
    miembro: "", contactoReferido: "", importe: "", fechaNegocio: "",
  });

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    const nombre  = form.contactoReferido.trim();
    const importe = form.importe.trim();
    const today   = new Date();

    if (!form.miembro)
      newErrors.miembro = "Debe seleccionar un miembro.";

    if (!nombre)
      newErrors.contactoReferido = "El nombre del contacto es requerido.";
    else if (nombre.length < 3)
      newErrors.contactoReferido = "Debe tener al menos 3 caracteres.";
    else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre))
      newErrors.contactoReferido = "Solo puede contener letras y espacios.";

    if (!importe)
      newErrors.importe = "El importe del negocio es requerido.";
    else if (!/^\d+([.,]\d{1,2})?$/.test(importe))
      newErrors.importe = "Introduce un importe válido (ej: 1500 o 1500,00).";
    else if (parseFloat(importe.replace(",", ".")) <= 0)
      newErrors.importe = "El importe debe ser mayor que 0.";

    if (!form.fechaNegocio)
      newErrors.fechaNegocio = "La fecha del negocio es requerida.";
    else if (form.fechaNegocio > today)
      newErrors.fechaNegocio = "La fecha del negocio no puede ser futura.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) { setIsError(true); return; }

    try {
      setSubmitting(true);

      await crearAgradecimiento({
        receptorId:     form.miembro,
        nombreContacto: form.contactoReferido,
        importe:        parseFloat(form.importe.replace(",", ".")),
        fechaNegocio:   form.fechaNegocio.toISOString(),
      });

      showToast("Agradecimiento registrado", "success");
      router.back();
    } catch (error: any) {
      showToast(error.message || "Error al crear el agradecimiento", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HandlerIndicator />
      <KeyboardAwareScrollView
        contentContainerStyle={globalStyles.formContainer}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Gracias Negocio Cerrado</Text>
          <Text style={globalStyles.containerDescription}>
            Agradece por el negocio que has cerrado con el contacto referido.
          </Text>
        </View>

        <View style={globalStyles.formFields}>
          {/* ── Gracias a ── */}
          <FormField label="Gracias a" icon="megaphone" error={errors.miembro}>
            <TouchableOpacity onPress={() => memberSheetRef.current?.snapToIndex(0)}>
              <View style={globalStyles.formSelectContainer}>
                <Text style={{ color: selectedMember ? colors.primaryText : colors.secondaryText }}>
                  {selectedMember ? selectedMember.name : "Selecciona un miembro"}
                </Text>
                <Ionicons name="chevron-down" size={18} color={colors.secondaryText} />
              </View>
            </TouchableOpacity>
          </FormField>

          {/* ── Contacto referido ── */}
          <FormField label="Por la referencia de (contacto)" icon="person-sharp" error={errors.contactoReferido}>
            <TextInput
              placeholder="Nombre del contacto referido"
              placeholderTextColor={colors.secondaryText}
              value={form.contactoReferido}
              onChangeText={(text) => { setForm({ ...form, contactoReferido: text }); clearError("contactoReferido"); }}
            />
          </FormField>

          {/* ── Importe ── */}
          <FormField label="Importe del negocio (€)" icon="logo-usd" error={errors.importe}>
            <TextInput
              placeholder="0.00"
              placeholderTextColor={colors.secondaryText}
              keyboardType="decimal-pad"
              value={form.importe}
              onChangeText={(text) => { setForm({ ...form, importe: text }); clearError("importe"); }}
            />
          </FormField>

          {/* ── Fecha ── */}
          <FormField label="Fecha del negocio cerrado" icon="calendar-clear" error={errors.fechaNegocio}>
            <TouchableOpacity onPress={() => dateSheetRef.current?.snapToIndex(0)}>
              <Text>
                {form.fechaNegocio.toLocaleDateString("es-ES", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </Text>
            </TouchableOpacity>
          </FormField>
        </View>

        {isError && (
  <Text style={{ color: colors.error, textAlign: "center", marginTop: 10 }}>
    {Object.values(errors).find(msg => msg !== "") || "Revisa los campos del formulario"}
  </Text>
)}

        {submitting ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Button
            label="Enviar Agradecimiento"
            variant="primary"
            onPress={handleSubmit}
            disabled={submitting}
          />
        )}
      </KeyboardAwareScrollView>

      <MemberSelectSheet
        ref={memberSheetRef}
        options={memberOptions}
        selected={selectedMember}
        onSelect={(member) => {
          setSelectedMember(member);
          setForm((prev) => ({ ...prev, miembro: member.id }));
          clearError("miembro");
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />

      <DatePickerSheet
        ref={dateSheetRef}
        value={form.fechaNegocio}
        onConfirm={(selectedDate) => {
          setForm((prev) => ({ ...prev, fechaNegocio: selectedDate }));
          clearError("fechaNegocio");
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />
    </View>
  );
}