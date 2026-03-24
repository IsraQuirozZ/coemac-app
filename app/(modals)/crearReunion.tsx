import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { reunionesStyles as styles } from "@/styles/reuniones.styles";
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

export default function CrearReunion() {
  const router = useRouter();

  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showMemberOptions, setShowMemberOptions] = useState(false);
  const [temas, setTemas] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    // TODO: prisma.reunion.create({ data: { miembro: selectedMember, fecha: date, temas } })
    router.back();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
      enableOnAndroid={true}
    >
      <View style={styles.formHeaderText}>
        <Text style={styles.formTitle}>Registra una reunión</Text>
        <Text style={styles.formSubtitle}>
          Registra la reunión que tuviste con algún miembro.
        </Text>
      </View>

      <View style={styles.formFields}>

        {/* ── Reunión con (member picker) ── */}
        <FormField label="Reunión con" icon="people">
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

        {/* ── Fecha de reunión ── */}
        <FormField label="Fecha de reunión" icon="calendar-clear" date={true}>
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

        {/* ── Temas tratados ── */}
        <FormField label="Temas tratados" icon="reader">
          <TextInput
            value={temas}
            onChangeText={setTemas}
            placeholder="Tu texto aquí..."
            placeholderTextColor={colors.secondaryText}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </FormField>

      </View>

      <Button
        label="Registrar Reunión"
        variant="primary"
        onPress={handleSubmit}
      />
    </KeyboardAwareScrollView>
  );
}