import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { referenciaCrearStyles as styles } from "@/styles/referenciaCrear.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CrearReferencia() {
  const [tipo, setTipo] = useState<"interna" | "externa">("interna");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showMemberOptions, setShowMemberOptions] = useState(false);
  const router = useRouter();
  const memberOptions = [
    "Ana Martínez",
    "Carlos Pérez",
    "Luisa Gómez",
    "Daniel Rivera",
  ];

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.referenciasContainer}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
      enableOnAndroid={true}
    >
      <View style={styles.referenciasText}>
        <Text style={styles.referenciasTitle}>Has una referencia</Text>
        <Text style={styles.referenciasDescription}>
          Referencia un contacto a un miembro de Coemac para que pueda ayudarlo
          a resolver su problema.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <FormField label="Referencia para" icon="megaphone">
          <TouchableOpacity
            onPress={() => setShowMemberOptions((prev) => !prev)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: selectedMember
                    ? colors.primaryText
                    : colors.secondaryText,
                }}
              >
                {selectedMember || "Selecciona un miembro"}
              </Text>
              <Ionicons
                name={showMemberOptions ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.secondaryText}
              />
            </View>
          </TouchableOpacity>
          {showMemberOptions && (
            <View
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {memberOptions.map((member) => (
                <TouchableOpacity
                  key={member}
                  onPress={() => {
                    setSelectedMember(member);
                    setShowMemberOptions(false);
                  }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    borderBottomWidth:
                      member !== memberOptions[memberOptions.length - 1]
                        ? 1
                        : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>{member}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </FormField>
        <FormField label="Contacto referido" icon="person-sharp">
          <TextInput
            placeholderTextColor={colors.secondaryText}
            placeholder="Nombre del contacto referido"
          />
        </FormField>
        <FormField label="Email del contacto" icon="mail">
          <TextInput
            placeholderTextColor={colors.secondaryText}
            placeholder="tucorreo@networking.com"
          />
        </FormField>
        <FormField label="Teléfono del contacto" icon="call">
          <TextInput
            placeholderTextColor={colors.secondaryText}
            placeholder="00123456789"
          />
        </FormField>
        <FormField
          label="Fecha de la referencia"
          icon="calendar-clear"
          date={true}
        >
          <View>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                if (selectedDate) setDate(selectedDate);
              }}
            />

            <TouchableOpacity onPress={() => setShowPicker(false)}>
              <Text style={{ color: colors.light, textAlign: "right" }}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </FormField>

        <FormField label="Descripción de la referencia" icon="reader">
          <TextInput
            placeholderTextColor={colors.secondaryText}
            placeholder="Describe la referencia..."
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </FormField>
        <FormField label="Tipo de referencia" icon="sync">
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => setTipo("interna")}
            >
              <View style={styles.radioOuter}>
                {tipo === "interna" && <View style={styles.radioInner} />}
              </View>
              <Text>Interna</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => setTipo("externa")}
            >
              <View style={styles.radioOuter}>
                {tipo === "externa" && <View style={styles.radioInner} />}
              </View>
              <Text>Externa</Text>
            </TouchableOpacity>
          </View>
        </FormField>
      </View>
      <Button
        label="Crear Referencia"
        variant="primary"
        onPress={() => router.back()}
      />
    </KeyboardAwareScrollView>
  );
}
