/**
 * Clily design tokens: the single source of colors, fonts, radii and spacing.
 * Components must import from here instead of hardcoding values.
 * Values come from the Figma file; the PRD's estimates are noted where Figma differs.
 */

export const colors = {
  // Official Clily palette
  navy: '#124170',
  blue: '#26667F',
  green: '#67C090',
  mint: '#DDF4E7',

  // Extra shades used in Figma gradients
  teal: '#4F9F8A', // dark end of the kingdom card gradient

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  onDark: '#F8F8F8', // text and icons on navy surfaces; also input and dialog fill
  surface: '#F7F7F7', // white cards (PRD estimate)
  textMuted: '#7B9BB5', // PRD estimate; Figma auth screens use navyMuted instead
  navyMuted: 'rgba(18, 65, 112, 0.5)', // subtitles, placeholders, helper text
  border: '#D9D9D9', // verification code boxes
  error: '#C0392B',

  shadow: '#000000',
  backdrop: 'rgba(0, 0, 0, 0.4)',
} as const;

export const gradients = {
  /** Screen header, left → right */
  header: [colors.navy, colors.blue],
  /** Kingdom cards; reverse for the alternating cards */
  card: [colors.teal, colors.green, colors.mint],
  /** Welcome, login and forgot-password backgrounds, top → bottom */
  authNavy: [colors.navy, colors.blue, colors.navy],
  /** Splash background, top → bottom (mint holds until 50%) */
  splash: [colors.mint, colors.mint, colors.white],
  /** Register background, top → bottom */
  register: [colors.mint, colors.mint, colors.onDark],
} as const;

export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const fontSizes = {
  caption: 10, // bottom nav labels
  small: 12, // "Ingat saya", "Lupa Password?"
  body: 13, // search placeholder, chips
  description: 14, // helper paragraphs on auth screens
  input: 15, // text fields, buttons, footer links
  headerTitle: 15,
  cardTitle: 20,
  subtitle: 20, // "Masuk ke akun anda"
  title: 24, // section titles, e.g. "Kingdom dan Filum"
  verifyTitle: 35, // "Verifikasi Email Anda"
  display: 40, // "Selamat Datang Kembali!", "Daftar"
} as const;

export const radius = {
  card: 15, // PRD estimated 20; Figma uses 15
  input: 15, // PRD estimated 16; Figma uses 15 for inputs and buttons
  checkbox: 3,
  header: 20, // bottom corners of ScreenHeader
  cameraButton: 20,
  hero: 24,
  pill: 50, // search bar, chips
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const shadows = {
  header: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  cameraButton: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  /** Illustration circles and verification code boxes (Figma: 0 4 2 rgba(0,0,0,.25)) */
  raised: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
} as const;

/** Text shadow on the Welcome title (Figma: 0 4 10 rgba(0,0,0,.25)) */
export const textShadows = {
  display: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
} as const;

/** Layout sizes measured from the 412 × 917 Figma frames */
export const layout = {
  designWidth: 412,
  designHeight: 917,
  headerHeight: 102,
  bottomNavHeight: 73,
  screenPadding: 20,
  authPadding: 41, // 330px-wide forms centered in a 412px frame
  fieldHeight: 55,
} as const;
