import { Platform, StyleSheet } from 'react-native';

// ─────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────
const C = {
  primary:       '#1A5C4B',   // verde oscuro corporativo
  primaryLight:  '#D4EBE3',   // verde menta suave — badge card, avatar picker
  white:         '#FFFFFF',
  bg:            '#F7F9F8',   // fondo general app
  cardBg:        '#FFFFFF',
  textDark:      '#1A1A1A',   // texto principal y "Por: ..." en cards
  textMid:       '#555555',   // subtítulos y texto secundario
  textLight:     '#999999',   // metadatos, fechas
  placeholder:   '#BBBBBB',
  border:        '#DDE8E3',
  filterBg:      '#DDE8E3',
  filterInactive:'#8AADA3',
  overlay:       'rgba(0,0,0,0.42)',
  successBg:     'rgba(0,0,0,0.50)',
};

export const styles = StyleSheet.create({

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CONTAINER GENERAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PANTALLA 1 — LISTA
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Bloque título + subtítulo debajo del Header importado
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 12,
  },

  // "Gracias Usuario!"
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: C.primary,
    letterSpacing: -0.6,
    marginBottom: 5,
  },

  // "Registro de agradecimientos recibidos y enviados"
  pageSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: C.textMid,
    lineHeight: 20,
  },

  // Pastilla Recibidos / Enviados
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

  // Texto tab inactivo
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.filterInactive,
  },

  // Texto tab activo
  filterTabTextActive: {
    color: C.white,
  },

  // Padding de la FlatList
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 110,
    gap: 10,
  },

  // ── CARD ──
  card: {
    backgroundColor: C.cardBg,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },

  // Cuadrado menta con importe
  cardAmountBadge: {
    width: 66,
    height: 66,
    borderRadius: 13,
    backgroundColor: C.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // "€1.500"
  cardAmountText: {
    fontSize: 13,
    fontWeight: '800',
    color: C.primary,
    textAlign: 'center',
    letterSpacing: -0.2,
  },

  cardContent: {
    flex: 1,
    gap: 3,
  },

  // "Usuario - Te ha dado las gracias!"
  cardTitle: {
    fontSize: 14,
    lineHeight: 20,
  },

  // "Usuario" en negrita
  cardUser: {
    fontWeight: '700',
    color: C.textDark,
  },

  // " - Te ha dado las gracias!"
  cardTitleSuffix: {
    fontWeight: '400',
    color: C.textDark,
  },

  // "Por: Contacto reparación tubería." → #1A1A1A
  cardMotivo: {
    fontSize: 13,
    fontWeight: '400',
    color: C.textDark,   // #1A1A1A — igual que el resto del texto de la card
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },

  // "Cantidad: 1.500€"
  cardCantidad: {
    fontSize: 12.5,
    color: C.textMid,
    fontWeight: '400',
  },

  // "17 Mar 2026"
  cardFecha: {
    fontSize: 11.5,
    color: C.textLight,
    fontWeight: '400',
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

  // Botón "< Agradecimientos" — llama onBack → setScreen('list')
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

  // "Gracias Negocio Cerrado"
  formTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: C.primary,
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 2,
  },

  // "Agradece por el negocio..."
  formSubtitle: {
    fontSize: 13.5,
    fontWeight: '400',
    color: C.textMid,
    lineHeight: 20,
    marginBottom: 4,
  },

  // Tarjeta de cada campo
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

  // Fila icono + label
  formFieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  // "Gracias a:", "Por la referencia de..." etc.
  formFieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: C.primary,
    flex: 1,
  },

  // Input clickeable (picker miembro / fecha)
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

  // Texto dentro de formInputRow
  formInputText: {
    fontSize: 14,
    fontWeight: '400',
    color: C.textDark,
    flex: 1,
  },

  // Placeholder visual
  formPlaceholder: {
    color: C.placeholder,
  },

  // TextInput libre (contacto, importe)
  formInputText2: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    fontWeight: '400',
    color: C.textDark,
    backgroundColor: C.white,
  },

  // "Enviar Agradecimiento"
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

  // Cabecera verde con Cancelar / título / Confirmar
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

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PANTALLA 3 — SUCCESS MODAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  successOverlay: {
    flex: 1,
    backgroundColor: C.successBg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  successCard: {
    backgroundColor: C.white,
    borderRadius: 22,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 14,
    gap: 16,
  },

  // "¡Gracias por tu Feedback!"
  successTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: C.primary,
    textAlign: 'center',
    letterSpacing: -0.3,
  },

  // "Tu reconocimiento ha sido enviado con éxito."
  successSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: C.textMid,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Fila de dos boxes
  successInfo: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },

  // Cada box (Has elogiado a / Motivo)
  successInfoItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    gap: 6,
    backgroundColor: C.white,
  },

  // "Has elogiado a:" / "Motivo:" → mismo verde que el icono (#1A5C4B)
  successInfoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: C.primary,   // #1A5C4B — igual que los iconos thumbs-up y chat
    textAlign: 'center',
  },

  // "Usuario" / "Negocio cerrado"
  successInfoValue: {
    fontSize: 13.5,
    fontWeight: '600',
    color: C.textDark,
    textAlign: 'center',
  },

  // "Tu feedback contribuye a fortalecer nuestra comunidad."
  successFooterText: {
    fontSize: 13,
    fontWeight: '400',
    color: C.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },

  // Botón "Listo"
  successButton: {
    backgroundColor: C.primary,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    width: '100%',
    shadowColor: C.primary,
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

  successButtonText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // Link "Enviar otro agradecimiento"
  successLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.primary,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});