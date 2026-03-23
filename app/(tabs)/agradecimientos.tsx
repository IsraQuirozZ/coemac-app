import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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
import { styles } from '../../styles/agradecimientos.styles';

// ── Header externo ──────────────────────────────────────────────────────────
// El header vive en components/layout/header.tsx fuera de /app
// Ajusta la ruta relativa según tu estructura exacta si es necesario
import Header from "@/components/layout/Header";


// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
type FilterType = 'recibidos' | 'enviados';
type ScreenType = 'list' | 'form';

interface Agradecimiento {
  id: string;
  usuario: string;
  motivo: string;
  cantidad: number;
  fecha: string;
}

interface FormData {
  miembro: string;
  contacto: string;
  importe: string;
  fecha: Date | null;
}

// ─────────────────────────────────────────
// MOCK DATA — swap with Prisma/PostgreSQL queries later
// ─────────────────────────────────────────
const MOCK_RECIBIDOS: Agradecimiento[] = [
  { id: '1', usuario: 'Usuario', motivo: 'Contacto reparación tubería.', cantidad: 1500, fecha: '17 Mar 2026' },
  { id: '2', usuario: 'Usuario', motivo: 'Contacto reparación tubería.', cantidad: 1500, fecha: '17 Mar 2026' },
  { id: '3', usuario: 'Usuario', motivo: 'Contacto reparación tubería.', cantidad: 1500, fecha: '17 Mar 2026' },
  { id: '4', usuario: 'Usuario', motivo: 'Contacto reparación tubería.', cantidad: 1500, fecha: '17 Mar 2026' },
  { id: '5', usuario: 'Usuario', motivo: 'Contacto reparación tubería.', cantidad: 1500, fecha: '17 Mar 2026' },
];

const MOCK_ENVIADOS: Agradecimiento[] = [
  { id: '6', usuario: 'María G.', motivo: 'Referencia cliente nuevo.', cantidad: 800, fecha: '15 Mar 2026' },
  { id: '7', usuario: 'Carlos P.', motivo: 'Cierre contrato anual.', cantidad: 3200, fecha: '10 Mar 2026' },
];

// TODO: Replace with → prisma.agradecimiento.findMany({ where: { tipo: filter } })
const fetchAgradecimientos = (filter: FilterType): Agradecimiento[] =>
  filter === 'recibidos' ? MOCK_RECIBIDOS : MOCK_ENVIADOS;

// TODO: Replace with → prisma.miembro.findMany()
const MOCK_MEMBERS = [
  'Ana Martínez', 'Carlos López', 'Elena García', 'Fernando Ruiz',
  'Isabel Sánchez', 'Javier Torres', 'Laura Fernández', 'Miguel Herrera',
  'Nuria Castillo', 'Pablo Jiménez',
];

// ─────────────────────────────────────────
// CARD — Imagen 1
// ─────────────────────────────────────────
const AgradecimientoCard = ({ item }: { item: Agradecimiento }) => (
  <View style={styles.card}>
    <View style={styles.cardAmountBadge}>
      <Text style={styles.cardAmountText}>€{item.cantidad.toLocaleString('es-ES')}</Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle} numberOfLines={1}>
        <Text style={styles.cardUser}>{item.usuario}</Text>
        <Text style={styles.cardTitleSuffix}> - Te ha dado las gracias!</Text>
      </Text>
      {/* "Por: ..." en #1A1A1A */}
      <Text style={styles.cardMotivo}>Por: {item.motivo}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardCantidad}>Cantidad: {item.cantidad.toLocaleString('es-ES')}€</Text>
        <Text style={styles.cardFecha}>{item.fecha}</Text>
      </View>
    </View>
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
            <Text style={styles.datePickerTitle}>Fecha del negocio</Text>
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
            onChange={(_, selectedDate) => {
              if (selectedDate) setTempDate(selectedDate);
            }}
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
// onBack lleva de vuelta a la pantalla de lista
// ─────────────────────────────────────────
const FormScreen = ({
  onSuccess,
  onBack,
}: {
  onSuccess: (data: FormData) => void;
  onBack: () => void;      // ← llama a setScreen('list') desde el padre
}) => {
  const [form, setForm] = useState<FormData>({
    miembro: '',
    contacto: '',
    importe: '',
    fecha: null,
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
    // TODO: POST → await fetch('/api/agradecimientos', { method: 'POST', body: JSON.stringify(form) })
    if (form.miembro && form.contacto && form.importe && form.fecha) {
      onSuccess(form);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ── Botón volver → llama onBack → setScreen('list') en el padre ── */}
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={22} color="#1A5C4B" />
        <Text style={styles.backButtonText}>Agradecimientos</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.formScroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.formTitle}>Gracias Negocio Cerrado</Text>
        <Text style={styles.formSubtitle}>
          Agradece por el negocio que has cerrado con{'\n'}el contacto referido.
        </Text>

        {/* ── Campo 1: Gracias a ── */}
        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <MaterialCommunityIcons name="handshake" size={21} color="#1A5C4B" />
            <Text style={styles.formFieldLabel}> Gracias a:</Text>
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

        {/* ── Campo 2: Por la referencia de ── */}
        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <MaterialIcons name="build" size={21} color="#1A5C4B" />
            <Text style={styles.formFieldLabel}> Por la referencia de (contacto):</Text>
          </View>
          <TextInput
            style={styles.formInputText2}
            placeholder="Nombre del contacto referido"
            placeholderTextColor="#BBBBBB"
            value={form.contacto}
            onChangeText={(v) => setForm({ ...form, contacto: v })}
          />
        </View>

        {/* ── Campo 3: Importe ── */}
        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <FontAwesome5 name="dollar-sign" size={19} color="#1A5C4B" />
            <Text style={styles.formFieldLabel}> Importe del negocio (€):</Text>
          </View>
          <TextInput
            style={styles.formInputText2}
            placeholder=""
            placeholderTextColor="#BBBBBB"
            keyboardType="decimal-pad"
            value={form.importe}
            onChangeText={(v) => setForm({ ...form, importe: v })}
          />
        </View>

        {/* ── Campo 4: Fecha ── */}
        <View style={styles.formField}>
          <View style={styles.formFieldHeader}>
            <MaterialIcons name="event-available" size={21} color="#1A5C4B" />
            <Text style={styles.formFieldLabel}> Fecha del negocio cerrado:</Text>
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

          {/* Android: DatePicker inline */}
          {showDatePicker && Platform.OS === 'android' && (
            <DateTimePicker
              value={form.fecha || new Date()}
              mode="date"
              display="default"
              accentColor="#1A5C4B"
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setForm({ ...form, fecha: selectedDate });
              }}
            />
          )}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitButtonText}>Enviar Agradecimiento</Text>
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

      {/* iOS Date Picker en verde */}
      {Platform.OS === 'ios' && (
        <DatePickerModal
          visible={showDatePicker}
          currentDate={form.fecha || new Date()}
          onConfirm={(date) => setForm({ ...form, fecha: date })}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </KeyboardAvoidingView>
  );
};

// ─────────────────────────────────────────
// SUCCESS MODAL — Imagen 3
// ─────────────────────────────────────────
const SuccessModal = ({
  visible,
  miembro,
  onDone,
  onSendAnother,
}: {
  visible: boolean;
  miembro: string;
  onDone: () => void;
  onSendAnother: () => void;
}) => (
  <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
    <View style={styles.successOverlay}>
      <View style={styles.successCard}>
        <Text style={styles.successTitle}>¡Gracias por tu Feedback!</Text>
        <Text style={styles.successSubtitle}>
          Tu reconocimiento ha sido enviado con éxito.
        </Text>

        <View style={styles.successInfo}>
          {/* Has elogiado a */}
          <View style={styles.successInfoItem}>
            <FontAwesome5 name="thumbs-up" size={30} color="#1A5C4B" />
            {/* Label en el mismo verde que el icono */}
            <Text style={styles.successInfoLabel}>Has elogiado a:</Text>
            <Text style={styles.successInfoValue}>{miembro || 'Usuario'}</Text>
          </View>
          {/* Motivo */}
          <View style={styles.successInfoItem}>
            <MaterialCommunityIcons name="chat" size={30} color="#1A5C4B" />
            {/* Label en el mismo verde que el icono */}
            <Text style={styles.successInfoLabel}>Motivo:</Text>
            <Text style={styles.successInfoValue}>Negocio cerrado</Text>
          </View>
        </View>

        <Text style={styles.successFooterText}>
          Tu feedback contribuye a fortalecer nuestra comunidad.
        </Text>

        <TouchableOpacity style={styles.successButton} onPress={onDone} activeOpacity={0.85}>
          <Text style={styles.successButtonText}>Listo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSendAnother} activeOpacity={0.7}>
          <Text style={styles.successLinkText}>Enviar otro agradecimiento</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// ─────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────
export default function AgradecimientosScreen() {
  const [screen, setScreen] = useState<ScreenType>('list');
  const [filter, setFilter] = useState<FilterType>('recibidos');
  const [lastForm, setLastForm] = useState<FormData | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const data = fetchAgradecimientos(filter);

  const handleFormSuccess = (formData: FormData) => {
    setLastForm(formData);
    setShowSuccess(true);
  };

  // "Listo" → cierra modal y vuelve a la lista
  const handleDone = () => {
    setShowSuccess(false);
    setScreen('list');
  };

  // "Enviar otro" → cierra modal y vuelve al formulario vacío
  const handleSendAnother = () => {
    setShowSuccess(false);
    setScreen('form');
  };

  // ── PANTALLA 1: LISTA ──────────────────────────────────────────────────────
  if (screen === 'list') {
    return (
      <View style={styles.container}>

        {/* ── Header externo importado desde components/layout/header.tsx ── */}
        <Header title="Agradecimientos" />

        {/* Título y subtítulo de la sección */}
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>Gracias Usuario!</Text>
          <Text style={styles.pageSubtitle}>
            Registro de agradecimientos recibidos y enviados
          </Text>
        </View>

        {/* Filtros Recibidos / Enviados */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'recibidos' && styles.filterTabActive]}
            onPress={() => setFilter('recibidos')}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterTabText, filter === 'recibidos' && styles.filterTabTextActive]}>
              Recibidos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'enviados' && styles.filterTabActive]}
            onPress={() => setFilter('enviados')}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterTabText, filter === 'enviados' && styles.filterTabTextActive]}>
              Enviados
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de cards */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AgradecimientoCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* FAB (+) — abre el formulario */}
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

  // ── PANTALLA 2: FORMULARIO ─────────────────────────────────────────────────
  // onBack={()=> setScreen('list')} conecta el botón "< Agradecimientos"
  // directamente con el estado del padre para volver a la lista
  return (
    <View style={styles.container}>
      <Header title="Agradecimientos" />
      <FormScreen
        onSuccess={handleFormSuccess}
        onBack={() => setScreen('list')}
      />
      <SuccessModal
        visible={showSuccess}
        miembro={lastForm?.miembro || ''}
        onDone={handleDone}
        onSendAnother={handleSendAnother}
      />
    </View>
  );
}