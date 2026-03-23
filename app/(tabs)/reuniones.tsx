import Header from "@/components/layout/Header";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/reuniones.styles';

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
type FilterType = 'pasadas' | 'proximas';
type ScreenType = 'list' | 'form';

interface Reunion {
  id: string;
  dia: string;
  mes: string;
  hora: string;
  nombre: string;
  empresa: string;
  descripcion: string;
}

interface FormData {
  miembro: string;
  fecha: Date | null;
  temas: string;
}

// ─────────────────────────────────────────
// MOCK DATA — swap with Prisma/PostgreSQL later
// TODO: prisma.reunion.findMany({ where: { tipo: filter } })
// ─────────────────────────────────────────
const MOCK_PASADAS: Reunion[] = [
  { id: '1', dia: '28', mes: 'Feb.', hora: '15:00', nombre: 'Laura', empresa: 'Empresa', descripcion: 'Charla sobre contacto' },
  { id: '2', dia: '28', mes: 'Feb.', hora: '15:00', nombre: 'Laura', empresa: 'Empresa', descripcion: 'Charla sobre contacto' },
  { id: '3', dia: '28', mes: 'Feb.', hora: '15:00', nombre: 'Laura', empresa: 'Empresa', descripcion: 'Charla sobre contacto' },
  { id: '4', dia: '28', mes: 'Feb.', hora: '15:00', nombre: 'Laura', empresa: 'Empresa', descripcion: 'Charla sobre contacto' },
];

const MOCK_PROXIMAS: Reunion[] = [
  { id: '5', dia: '15', mes: 'Abr.', hora: '10:00', nombre: 'Carlos', empresa: 'TechCorp', descripcion: 'Seguimiento proyecto' },
  { id: '6', dia: '22', mes: 'Abr.', hora: '16:30', nombre: 'Ana', empresa: 'StartupX', descripcion: 'Presentación propuesta' },
];

// TODO: Replace with → prisma.miembro.findMany()
const MOCK_MEMBERS = [
  'Ana Martínez', 'Carlos López', 'Elena García', 'Fernando Ruiz',
  'Isabel Sánchez', 'Javier Torres', 'Laura Fernández', 'Miguel Herrera',
  'Nuria Castillo', 'Pablo Jiménez',
];

const fetchReuniones = (filter: FilterType): Reunion[] =>
  filter === 'pasadas' ? MOCK_PASADAS : MOCK_PROXIMAS;

// ─────────────────────────────────────────
// REUNION CARD — Imagen 1
// ─────────────────────────────────────────
const ReunionCard = ({ item }: { item: Reunion }) => (
  <View style={styles.card}>

    {/* Columna izquierda: DOS bloques apilados */}
    <View style={styles.cardDateCol}>
      {/* Bloque superior verdoso — día + mes */}
      <View style={styles.cardDateTop}>
        <Text style={styles.cardDay}>{item.dia}</Text>
        <Text style={styles.cardMonth}>{item.mes}</Text>
      </View>
      {/* Bloque inferior blanco-claro — hora */}
      <View style={styles.cardDateBottom}>
        <Text style={styles.cardHourSmall}>{item.hora}</Text>
      </View>
    </View>

    {/* Avatar circular */}
    <View style={styles.cardAvatar}>
      <FontAwesome5 name="user" size={18} color="#9FBDB5" />
    </View>

    {/* Columna derecha: info */}
    <View style={styles.cardInfo}>
      <Text style={styles.cardHour}>{item.hora}</Text>
      <Text style={styles.cardName} numberOfLines={1}>
        <Text style={styles.cardNameBold}>{item.nombre}</Text>
        <Text style={styles.cardNameNormal}> - {item.empresa}</Text>
      </Text>
      <Text style={styles.cardDesc} numberOfLines={1}>{item.descripcion}</Text>
    </View>

    {/* Chevron derecha */}
    <Ionicons name="chevron-forward" size={18} color="#B0C4BC" style={styles.cardChevron} />
  </View>
);

// ─────────────────────────────────────────
// MEMBER PICKER MODAL
// ─────────────────────────────────────────
const MemberPickerModal = ({
  visible,
  members,
  onSelect,
  onClose,
}: {
  visible: boolean;
  members: string[];
  onSelect: (name: string) => void;
  onClose: () => void;
}) => (
  <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
    <View style={{ flex: 1 }}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.pickerSheet}>
        <View style={styles.pickerHandle} />
        <Text style={styles.pickerTitle}>Selecciona un miembro</Text>
        <FlatList
          data={members}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.pickerItem}
              onPress={() => onSelect(item)}
              activeOpacity={0.6}
            >
              <View style={styles.pickerItemAvatar}>
                <FontAwesome5 name="user" size={13} color="#1A5C4B" />
              </View>
              <Text style={styles.pickerItemText}>{item}</Text>
              <Ionicons name="chevron-forward" size={15} color="#C0D4CC" />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.pickerSeparator} />}
        />
      </View>
    </View>
  </Modal>
);

// ─────────────────────────────────────────
// DATE PICKER MODAL — verde corporativo iOS
// ─────────────────────────────────────────
const DatePickerModal = ({
  visible,
  currentDate,
  onConfirm,
  onClose,
}: {
  visible: boolean;
  currentDate: Date;
  onConfirm: (date: Date) => void;
  onClose: () => void;
}) => {
  const [tempDate, setTempDate] = useState<Date>(currentDate);
  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <View style={{ flex: 1 }}>
        <Pressable style={styles.overlay} onPress={onClose} />
        <View style={styles.datePickerSheet}>
          <View style={styles.datePickerHeader}>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.datePickerCancel}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.datePickerTitle}>Fecha de reunión</Text>
            <TouchableOpacity
              onPress={() => { onConfirm(tempDate); onClose(); }}
              activeOpacity={0.7}
            >
              <Text style={styles.datePickerConfirm}>Confirmar</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            onChange={(_, d) => { if (d) setTempDate(d); }}
            locale="es-ES"
            themeVariant="light"
            accentColor="#1A5C4B"
            textColor="#1A5C4B"
            style={styles.datePickerWidget}
          />
        </View>
      </View>
    </Modal>
  );
};

// ─────────────────────────────────────────
// FORM SCREEN — Imagen 2
// ─────────────────────────────────────────
const FormScreen = ({
  onSuccess,
  onBack,
}: {
  onSuccess: () => void;
  onBack: () => void;
}) => {
  const [form, setForm] = useState<FormData>({
    miembro: '',
    fecha: null,
    temas: '',
  });
  const [showMemberPicker, setShowMemberPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleSubmit = () => {
    // TODO: POST → prisma.reunion.create({ data: { ...form } })
    if (form.miembro && form.fecha) {
      onSuccess();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Botón volver */}
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={22} color="#1A5C4B" />
        <Text style={styles.backButtonText}>Reuniones</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.formScroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cabecera */}
        <Text style={styles.formTitle}>Registra una reunión</Text>
        <Text style={styles.formSubtitle}>
          Registra la reunión que tuviste con algún{'\n'}miembro.
        </Text>

        {/* ── Campo 1: Reunión con (member picker) ── */}
        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <FontAwesome5 name="user-friends" size={17} color="#1A5C4B" />
            <Text style={styles.formFieldLabel}> Reunión con:</Text>
          </View>
          <TouchableOpacity
            style={styles.formInputRow}
            onPress={() => setShowMemberPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={[styles.formInputText, !form.miembro && styles.formPlaceholder]}>
              {form.miembro || 'Selecciona a un miembro'}
            </Text>
            <Ionicons name="chevron-expand" size={20} color="#9BBDB5" />
          </TouchableOpacity>
        </View>

        {/* ── Campo 2: Fecha de reunión ── */}
        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <MaterialIcons name="event-available" size={20} color="#1A5C4B" />
            <Text style={styles.formFieldLabel}> Fecha de reunión</Text>
          </View>
          <TouchableOpacity
            style={styles.formInputRow}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text style={[styles.formInputText, !form.fecha && styles.formPlaceholder]}>
              {form.fecha ? formatDate(form.fecha) : 'DD/MM/YYYY'}
            </Text>
          </TouchableOpacity>

          {/* Android DatePicker inline */}
          {showDatePicker && Platform.OS === 'android' && (
            <DateTimePicker
              value={form.fecha || new Date()}
              mode="date"
              display="default"
              accentColor="#1A5C4B"
              onChange={(_, d) => {
                setShowDatePicker(false);
                if (d) setForm({ ...form, fecha: d });
              }}
            />
          )}
        </View>

        {/* ── Campo 3: Temas tratados (multiline) ── */}
        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <MaterialCommunityIcons name="format-list-bulleted" size={20} color="#1A5C4B" />
            <Text style={styles.formFieldLabel}> Temas tratados</Text>
          </View>
          <TextInput
            style={styles.formTextArea}
            placeholder="Tu texto aquí..."
            placeholderTextColor="#BBBBBB"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={form.temas}
            onChangeText={(v) => setForm({ ...form, temas: v })}
          />
        </View>

        {/* Botón registrar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitButtonText}>Registrar Reunión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Member Picker */}
      <MemberPickerModal
        visible={showMemberPicker}
        members={MOCK_MEMBERS}
        onSelect={(name) => {
          setForm({ ...form, miembro: name });
          setShowMemberPicker(false);
        }}
        onClose={() => setShowMemberPicker(false)}
      />

      {/* iOS Date Picker */}
      {Platform.OS === 'ios' && (
        <DatePickerModal
          visible={showDatePicker}
          currentDate={form.fecha || new Date()}
          onConfirm={(d) => setForm({ ...form, fecha: d })}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </KeyboardAvoidingView>
  );
};

// ─────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────
export default function ReunionesScreen() {
  const [screen, setScreen] = useState<ScreenType>('list');
  const [filter, setFilter] = useState<FilterType>('pasadas');

  const data = fetchReuniones(filter);

  // ── PANTALLA 1: LISTA ──────────────────
  if (screen === 'list') {
    return (
      <View style={styles.container}>
        <Header title="Reuniones" />

        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>Tus Reuniones</Text>
          <Text style={styles.pageSubtitle}>Registro de tus reuniones.</Text>
        </View>

        {/* Filtros */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'pasadas' && styles.filterTabActive]}
            onPress={() => setFilter('pasadas')}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterTabText, filter === 'pasadas' && styles.filterTabTextActive]}>
              Pasadas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'proximas' && styles.filterTabActive]}
            onPress={() => setFilter('proximas')}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterTabText, filter === 'proximas' && styles.filterTabTextActive]}>
              Próximas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReunionCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* FAB (+) */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setScreen('form')}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={34} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  }

  // ── PANTALLA 2: FORMULARIO ─────────────
  return (
    <View style={styles.container}>
      <FormScreen
        onSuccess={() => setScreen('list')}
        onBack={() => setScreen('list')}
      />
    </View>
  );
}