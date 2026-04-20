import Button from "@/components/ui/Button";
import { DatePickerSheet } from "@/components/ui/DatePickerSheet";
import FormField from "@/components/ui/FormField";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { MemberSelectSheet } from "@/components/ui/MemberSelectSheet";
import { getUsuarios } from "@/services/usuarioService";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "../../hooks/useToast";
import {
  crearReunion,
  getReunionById,
  updateReunion,
} from "../../services/reunionService";

export default function CrearReunion() {
  const router = useRouter();
  const { showToast } = useToast();
  const navigation = useNavigation();

  // MODALS (MEMBER SELECT & DATEPICKER)
  const [isAnySheetOpen, setIsAnySheetOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const memberSheetRef = useRef<BottomSheet>(null);

  const dateSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !isAnySheetOpen,
    });
  }, [isAnySheetOpen]);

  // CARGAR MIEMBROS
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
    id: m.id,
    name: `${m.nombre} ${m.apellido}`,
    company: m.empresa || "Sin empresa",
  }));

  // FORM
  const [form, setForm] = useState({
    invitadoId: null as string | null,
    fechaReunion: new Date(),
    descripcion: "",
  });

  // EDIT MODE
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;
  const [originalReunion, setOriginalReunion] = useState<any>(null);

  const loadReunion = async () => {
    try {
      const data = await getReunionById(id as string);
      setOriginalReunion(data);

      setForm({
        invitadoId: data.invitadoId || null,
        fechaReunion: data.fecha ? new Date(data.fecha) : new Date(),
        descripcion: data.descripcion || "",
      });
    } catch (error) {
      console.log("Error loading reunion", error);
    }
  };

  useEffect(() => {
    if (!isEditMode) return;

    loadReunion();
  }, [id]);

  // SINCRONIZAR MIEMBRO
  useEffect(() => {
    if (!members.length || !form.invitadoId) return;

    const member = members.find((m) => m.id === form.invitadoId);

    if (member) {
      setSelectedMember({
        id: member.id,
        name: `${member.nombre} ${member.apellido}`,
        company: member.empresa || "Sin empresa",
      });
    }
  }, [members, form.invitadoId]);

  // VALIDATIONS
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    invitadoId: "",
    fechaReunion: "",
    descripcion: "",
  });

  const validateForm = () => {
    let newErrors: any = {};

    const fechaReunion = form.fechaReunion;
    const today = new Date();
    const descripcion = form.descripcion.trim();

    const descripcionRegex = /^.{10,}$/;

    // MIEMBRO
    if (!form.invitadoId) {
      newErrors.invitadoId = "Selecciona un miembro";
    }

    // FECHA
    if (!fechaReunion) {
      newErrors.fechaReunion = "La fecha de la reunión es requerida.";
    } else if (fechaReunion > today) {
      newErrors.fechaReunion = "La fecha de la reunión no puede ser futura.";
    }

    // Descripcion
    if (descripcion && !descripcionRegex.test(descripcion)) {
      newErrors.descripcion =
        "Escribe al menos 10 caracteres para la descripción.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // SUBMIT
  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) {
      setIsError(true);
      return;
    }

    try {
      setSubmitting(true);

      const payload: any = {};

      if (
        !isEditMode ||
        form.fechaReunion.toISOString() !== originalReunion?.fecha
      ) {
        payload.fecha = form.fechaReunion.toISOString();
      }

      if (form.invitadoId !== originalReunion?.invitadoId) {
        payload.invitadoId = form.invitadoId;
      }

      const descripcion = form.descripcion.trim();

      if (descripcion && descripcion !== originalReunion?.descripcion) {
        payload.descripcion = descripcion;
      }

      if (isEditMode) {
        await updateReunion(id as string, payload);
        showToast("Reunión actualizada", "success");
      } else {
        await crearReunion(payload);
        showToast("Reunión registrada", "success");
      }

      router.back();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message ||
          (isEditMode
            ? "Error al actualizar la reunión"
            : "Error al registrar la reunión"),
      );
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
          <Text style={globalStyles.containerTitle}>
            {isEditMode ? "Editar reunión" : "Registra una reunión"}
          </Text>
          <Text style={globalStyles.containerDescription}>
            {isEditMode
              ? "Edita la información de la reunión."
              : "Registra la reunión que tuviste con algún miembro."}
          </Text>
        </View>
        <View style={globalStyles.formFields}>
          {/* ── Reunión con (member picker) ── */}

          <FormField
            label="Reunión con"
            icon="megaphone"
            error={errors.invitadoId}
          >
            <TouchableOpacity
              onPress={() => memberSheetRef.current?.snapToIndex(0)}
            >
              <View style={globalStyles.formSelectContainer}>
                <Text
                  style={{
                    color: selectedMember
                      ? colors.primaryText
                      : colors.secondaryText,
                  }}
                >
                  {selectedMember
                    ? selectedMember.name
                    : "Selecciona un miembro"}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={colors.secondaryText}
                />
              </View>
            </TouchableOpacity>
          </FormField>

          {/* ── Fecha de reunión ── */}
          <FormField
            label="Fecha de la reunión"
            icon="calendar-clear"
            error={errors.fechaReunion}
          >
            <TouchableOpacity
              onPress={() => {
                dateSheetRef.current?.snapToIndex(0);
              }}
            >
              <Text>
                {form.fechaReunion.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </TouchableOpacity>
          </FormField>

          {/* ── Temas tratados ── */}
          <FormField
            label="Temas tratados"
            icon="reader"
            error={errors.descripcion}
          >
            <TextInput
              placeholder="Tu texto aquí..."
              placeholderTextColor={colors.secondaryText}
              multiline
              numberOfLines={4}
              style={globalStyles.textArea}
              value={form.descripcion}
              onChangeText={(text) => {
                setForm({ ...form, descripcion: text });
                clearError("descripcion");
              }}
            />
          </FormField>
        </View>
        {isError && (
          <Text style={{ color: colors.error, textAlign: "center" }}>
            Por favor, solucione los errores antes de enviar.
          </Text>
        )}
        {submitting ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Button
            label={
              submitting
                ? isEditMode
                  ? "Actualizando..."
                  : "Registrando..."
                : isEditMode
                  ? "Actualizar Reunión"
                  : "Registrar Reunión"
            }
            variant="primary"
            onPress={handleSubmit}
            disabled={submitting}
          />
        )}
      </KeyboardAwareScrollView>
      {/* BOTTOM SHEET DE MIEMBROS */}
      <MemberSelectSheet
        ref={memberSheetRef}
        options={memberOptions}
        selected={selectedMember}
        onSelect={(member) => {
          setSelectedMember(member);
          setForm((prev) => ({ ...prev, invitadoId: member.id }));
          clearError("invitadoId");
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />
      {/* BOTTOM SHEET DE DATEPICKER */}
      <DatePickerSheet
        ref={dateSheetRef}
        value={form.fechaReunion}
        onConfirm={(selectedDate) => {
          setForm((prev) => ({
            ...prev,
            fechaReunion: selectedDate,
          }));
          clearError("fechaReunion");
        }}
        onOpenChange={(open) => setIsAnySheetOpen(open)}
      />
    </View>
  );
}
