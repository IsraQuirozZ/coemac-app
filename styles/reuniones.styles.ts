import { Platform, StyleSheet } from 'react-native';

// ─────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────
const C = {
  primary:        '#1A5C4B',   // verde oscuro corporativo
  primaryLight:   '#D4EBE3',   // verde menta — avatar picker
  white:          '#FFFFFF',
  bg:             '#F7F9F8',   // fondo general app — solicitado
  cardBg:         '#FFFFFF',
  cardBorder:     '#E2E2E2',   // borde gris neutro suave — igual que agradecimientos

  // ── Dos bloques independientes de la columna fecha ──
  dateBgTop:      '#C8DDD6',   // cuadrado superior verdoso — contiene "28" y "Feb."
  dateBgBottom:   '#EDF4F1',   // cuadrado inferior blanco-claro — contiene "15:00"
  dateTextTop:    '#1A5C4B',   // "28" y "Feb." — verde oscuro
  dateTextBottom: '#8AADA3',   // "15:00" — gris verdoso

  textDark:       '#1A1A1A',
  textMid:        '#555555',
  textLight:      '#999999',
  placeholder:    '#BBBBBB',
  border:         '#DDE8E3',
  filterBg:       '#DDE8E3',
  filterInactive: '#8AADA3',
  avatarBg:       '#DDE8E3',
  overlay:        'rgba(0,0,0,0.42)',
};

export const styles = StyleSheet.create({

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CONTENEDOR GENERAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PANTALLA 1 — LISTA
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 12,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: C.primary,
    letterSpacing: -0.6,
    marginBottom: 5,
  },

  pageSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: C.textMid,
    lineHeight: 20,
  },

  // Pastilla Pasadas / Próximas
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: C.filterBg,
    borderRadius: 10,
    padding: 3,
  },

  filterTab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterTabActive: {
    backgroundColor: C.primary,
    shadowColor: C.primary,
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },

  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.filterInactive,
  },

  filterTabTextActive: {
    color: C.white,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 110,
    gap: 12,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // REUNION CARD — estructura Figma
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Card exterior: blanca, esquinas muy redondeadas, borde gris neutro
  card: {
    backgroundColor: C.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.cardBorder,  // #E2E2E2 — gris neutro, sin verde
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },

  // Columna izquierda: dos cuadrados apilados
  cardDateCol: {
    width: 56,
    flexShrink: 0,
    gap: 4,
  },

  // Bloque superior verdoso — "28" + "Feb."
  cardDateTop: {
    backgroundColor: C.dateBgTop,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 4,
  },

  // "28" — grande, verde oscuro, extra-bold
  cardDay: {
    fontSize: 20,
    fontWeight: '800',
    color: C.dateTextTop,
    lineHeight: 24,
    letterSpacing: -0.3,
  },

  // "Feb." — pequeño, verde oscuro, semi-bold
  cardMonth: {
    fontSize: 12,
    fontWeight: '600',
    color: C.dateTextTop,
    lineHeight: 15,
  },

  // Bloque inferior blanco-claro — "15:00"
  cardDateBottom: {
    backgroundColor: C.dateBgBottom,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  // "15:00" — gris verdoso
  cardHourSmall: {
    fontSize: 11.5,
    fontWeight: '500',
    color: C.dateTextBottom,
  },

  // Avatar circular
  cardAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: C.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Columna derecha
  cardInfo: {
    flex: 1,
    gap: 2,
  },

  // "15:00" arriba
  cardHour: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textDark,
    lineHeight: 18,
  },

  // "Laura - Empresa"
  cardName: {
    fontSize: 14.5,
    lineHeight: 20,
  },

  cardNameBold: {
    fontWeight: '700',
    color: C.textDark,
  },

  cardNameNormal: {
    fontWeight: '400',
    color: C.textDark,
  },

  // "Charla sobre contacto"
  cardDesc: {
    fontSize: 12.5,
    fontWeight: '400',
    color: C.textLight,
    lineHeight: 17,
  },

  cardChevron: {
    flexShrink: 0,
    marginLeft: 2,
  },

  // ── FAB (+) ──
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.primary,
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 10,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PANTALLA 2 — FORMULARIO
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 4,
    gap: 2,
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: C.primary,
  },

  formScroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
    gap: 14,
  },

  formTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: C.primary,
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 2,
  },

  formSubtitle: {
    fontSize: 13.5,
    fontWeight: '400',
    color: C.textMid,
    lineHeight: 20,
    marginBottom: 4,
  },

  formField: {
    backgroundColor: C.cardBg,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
    gap: 10,
  },

  formFieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  formFieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: C.primary,
    flex: 1,
  },

  formInputRow: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.white,
  },

  formInputText: {
    fontSize: 14,
    fontWeight: '400',
    color: C.textDark,
    flex: 1,
  },

  formPlaceholder: {
    color: C.placeholder,
  },

  formTextArea: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
    fontWeight: '400',
    color: C.textDark,
    backgroundColor: C.white,
    minHeight: 120,
    textAlignVertical: 'top',
  },

  submitButton: {
    backgroundColor: C.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: C.primary,
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },

  submitButtonText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.1,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MEMBER PICKER MODAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  overlay: {
    flex: 1,
    backgroundColor: C.overlay,
  },

  pickerSheet: {
    backgroundColor: C.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    maxHeight: '65%',
  },

  pickerHandle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DDD',
    alignSelf: 'center',
    marginBottom: 14,
  },

  pickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: C.primary,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
  },

  pickerItemAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: C.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pickerItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: C.textDark,
  },

  pickerSeparator: {
    height: 1,
    backgroundColor: C.border,
    marginHorizontal: 20,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DATE PICKER MODAL (iOS)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  datePickerSheet: {
    backgroundColor: C.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    overflow: 'hidden',
  },

  datePickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.primary,
  },

  datePickerCancel: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.75)',
  },

  datePickerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.white,
  },

  datePickerConfirm: {
    fontSize: 15,
    fontWeight: '700',
    color: C.white,
  },

  datePickerWidget: {
    backgroundColor: C.white,
  },
});