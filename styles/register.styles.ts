import { StyleSheet } from 'react-native';

export const PRIMARY = '#1B6B5A';
export const PRIMARY_BUTTON = '#1E7A65';
export const BACKGROUND = '#F0F2F2';
export const CARD_BG = '#FFFFFF';
export const FIELD_BORDER = '#E0E6E5';
export const FIELD_BORDER_ACTIVE = '#1B6B5A';
export const TEXT_DARK = '#1A2C2A';
export const TEXT_MUTED = '#7A9490';
export const PLACEHOLDER = '#B0BCBA';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 48,
  },

  /* ── Header ── */
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: PRIMARY,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 15,
    color: TEXT_MUTED,
    marginTop: 6,
    fontWeight: '400',
  },

  /* ── Cada campo es su propio card independiente ── */
  fieldCard: {
    backgroundColor: CARD_BG,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: FIELD_BORDER,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  fieldCardActive: {
    borderColor: FIELD_BORDER_ACTIVE,
    borderWidth: 2,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelIcon: {
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: PRIMARY,
  },

  /* Input dentro del card */
  inputBox: {
    borderWidth: 1,
    borderColor: '#DDE3E2',
    borderRadius: 10,
    backgroundColor: '#FAFBFB',
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    color: PRIMARY,
  },

  /* Wrapper para password con ojo */
  inputPasswordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDE3E2',
    borderRadius: 10,
    backgroundColor: '#FAFBFB',
    paddingHorizontal: 14,
    height: 46,
  },
  inputPassword: {
    flex: 1,
    fontSize: 14,
    color: TEXT_DARK,
  },
  eyeButton: {
    paddingLeft: 8,
    justifyContent: 'center',
  },

  /* ── Botón ── */
  button: {
    backgroundColor: PRIMARY_BUTTON,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: PRIMARY_BUTTON,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  /* ── Login row ── */
  loginRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 4,
  },
  loginLabel: {
    fontSize: 13,
    color: TEXT_MUTED,
  },
  loginLink: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: '700',
  },
});