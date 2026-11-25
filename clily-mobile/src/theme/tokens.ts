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

  // Conservation status / population trend labels (Figma: Vulnerable #FFC64C, Menurun #FF2200)
  statusSafe: '#2E9E6B',
  statusWarning: '#FFC64C',
  statusDanger: '#FF2200',
  hotspot: 'rgba(233, 62, 62, 0.43)', // sighting areas on the distribution map
  mapBorder: '#4F9F8A',

  // Home / weather
  ink: '#1A4F76', // "Baca lebih banyak" label, trivia image overlay
  forecastPanel: '#3B6588', // weather forecast table
  sun: '#FFC64C',
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
  /** Light header variant (Cuaca), left → right */
  headerLight: [colors.onDark, colors.mint],
  /** Home "Ada Apa Hari Ini?" card, bottom-right → top-left (Figma -52°, green holds to 25%) */
  homeNews: [colors.green, colors.green, '#307482'],
  /** Home "Tahukah kamu?" card, left → right (teal holds to 32%) */
  homeTrivia: [colors.teal, colors.teal, '#26607A'],
  /** Home temperature map card, top → bottom */
  homeMap: ['#50A08A', colors.blue],
  /** Home footer, left → right (Figma rotates navy→blue by 180°) */
  homeFooter: [colors.blue, colors.navy],
  /** Pill buttons on home cards, left → right */
  pillButton: [colors.mint, colors.white],
  /** Trivia photo overlay, transparent top → ink bottom */
  photoOverlay: ['rgba(26, 79, 118, 0)', 'rgba(26, 79, 118, 0)', colors.ink],
  /** Heatmap screen background, top-left → bottom-right */
  heatmapScreen: [colors.mint, '#8FD2AE'],
  /** Encyclopedia class cards (Kelas), left → right; reverse for alternating cards */
  classCard: ['#50A08A', colors.navy],
  /** Family pills on the Ordo screen, left → right; reverse for alternating pills */
  familyPill: [colors.navy, colors.teal],
  /** Breadcrumb pill, left → right */
  breadcrumb: ['#50A08A', colors.green],
  /** Ordo and Famili screen background (Figma 23.5°: navy bottom-left → teal top-right) */
  taxonDark: [colors.navy, colors.teal],
  /** Genus (species list) background (Figma 61.5°: teal bottom-left → navy top-right) */
  taxonGenus: [colors.teal, colors.navy],
  /** Ordo screen panel, top → bottom */
  familyPanel: [colors.mint, colors.onDark],
  /** Photo tiles: transparent until ~45%, navy at the bottom-left corner */
  photoNavyOverlay: ['rgba(18, 65, 112, 0)', 'rgba(18, 65, 112, 0)', colors.navy],
  /** Filter bottom sheet, top → bottom */
  sheet: [colors.white, colors.white, colors.mint],
  /** Species detail screen background, top → bottom */
  speciesScreen: [colors.mint, colors.green],
  /** Species detail info panel (Figma 41°: navy bottom-left → teal top-right) */
  speciesPanel: [colors.navy, colors.teal],
  /** Keadaan / Populasi boxes, left → right (mint holds to 58%) */
  statBox: [colors.mint, colors.mint, colors.white],
  /** "Lihat Foto Lainnya" sheet, top → bottom */
  communitySheet: [colors.green, colors.teal, '#31707D'],
  /** Bottom fade on the community sheet */
  navyFade: ['rgba(18, 65, 112, 0)', colors.navy],
  /** Temperature legend, -30 °C → 50 °C */
  temperatureScale: [
    '#8D62B9', '#373998', '#3B6BB2', '#4A9BC7', '#A7ED91', '#FBE463', '#F57328', '#D9252B', '#600030',
  ],
} as const;

/** Stop positions for gradients.temperatureScale (from Figma) */
export const temperatureScaleStops = [0, 0.125, 0.2548, 0.3846, 0.5192, 0.6442, 0.774, 0.9038, 1] as const;

export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  italic: 'PlusJakartaSans_400Regular_Italic',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
  /** Figma uses Poppins for the news snippets and pill buttons on Beranda */
  poppinsRegular: 'Poppins_400Regular',
  poppinsMedium: 'Poppins_500Medium',
  poppinsSemiBold: 'Poppins_600SemiBold',
  poppinsExtraBold: 'Poppins_800ExtraBold',
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
  /** Home cards (Figma: 1 1 10 rgba(0,0,0,.25)) */
  homeCard: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  /** Photos and pill buttons on home cards (Figma: 2 2 4 rgba(0,0,0,.25)) */
  thumbnail: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
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
  /** Temperature legend labels (Figma: 1 1 5 rgba(0,0,0,.25)) */
  legend: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
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
