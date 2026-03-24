import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { agradecimientosStyles as styles } from "@/styles/agradecimientos.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// TODO: Replace with → prisma.miembro.findMany()
const memberOptions = [
  "Ana Martínez", "Carlos López", "Elena García", "Fernando Ruiz",
  "Isabel Sánchez", "Javier Torres", "Laura Fernández", "Miguel Herrera",
];

export default function CrearAgradecimiento() {
  const router = useRouter();

  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showMemberOptions, setShowMemberOptions] = useState(false);
  const [contacto, setContacto] = useState("");
  const [importe, setImporte] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    // TODO: prisma.agradecimiento.create({ data: { miembro: selectedMember, contacto, importe, fecha: date } })
    router.push("/(modals)/envioAgradecimiento");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
      enableOnAndroid={true}
    >
      <View style={styles.formHeaderText}>
        <Text style={styles.formTitle}>Gracias Negocio Cerrado</Text>
        <Text style={styles.formSubtitle}>
          Agradece por el negocio que has cerrado con el contacto referido.
        </Text>
      </View>

      <View style={styles.formFields}>

        {/* ── Gracias a (member picker) ── */}
        <FormField label="Gracias a" icon="megaphone">
          <TouchableOpacity onPress={() => setShowMemberOptions((prev) => !prev)}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ color: selectedMember ? colors.primaryText : colors.secondaryText }}>
                {selectedMember || "Selecciona a un miembro"}
              </Text>
              <Ionicons
                name={showMemberOptions ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.secondaryText}
              />
            </View>
          </TouchableOpacity>
          {showMemberOptions && (
            <View style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border, borderRadius: 8, overflow: "hidden" }}>
              {memberOptions.map((member) => (
                <TouchableOpacity
                  key={member}
                  onPress={() => { setSelectedMember(member); setShowMemberOptions(false); }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    borderBottomWidth: member !== memberOptions[memberOptions.length - 1] ? 1 : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>{member}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </FormField>

        {/* ── Por la referencia de (contacto) ── */}
        <FormField label="Por la referencia de (contacto)" icon="person-sharp">
          <TextInput
            value={contacto}
            onChangeText={setContacto}
            placeholder="Nombre del contacto referido"
            placeholderTextColor={colors.secondaryText}
          />
        </FormField>

        {/* ── Importe del negocio ── */}
        <FormField label="Importe del negocio (€)" icon="cash">
          <TextInput
            value={importe}
            onChangeText={setImporte}
            placeholder="0.00"
            placeholderTextColor={colors.secondaryText}
            keyboardType="decimal-pad"
          />
        </FormField>

        {/* ── Fecha del negocio cerrado ── */}
        <FormField label="Fecha del negocio cerrado" icon="calendar-clear" date={true}>
          <View>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                if (selectedDate) setDate(selectedDate);
              }}
            />
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ color: colors.light, textAlign: "right" }}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </FormField>

      </View>

      <Button
        label="Enviar Agradecimiento"
        variant="primary"
        onPress={handleSubmit}
      />
    </KeyboardAwareScrollView>
  );
}