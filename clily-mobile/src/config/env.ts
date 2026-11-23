import { Platform } from 'react-native';

/**
 * Catatan Konektivitas Android ke Backend Lokal:
 * - Android Emulator menggunakan IP khusus `10.0.2.2` untuk mengakses `localhost` komputer host.
 * - HP Android Fisik (Expo Go / USB Debugging) harus menggunakan IP LAN Wi-Fi komputer (misal: `http://192.168.1.10:3000`).
 * - Anda juga dapat mengatur variabel `EXPO_PUBLIC_API_URL` di file `.env`.
 */
const DEFAULT_HOST = Platform.select({
  android: 'http://10.0.2.2:3000',
  ios: 'http://localhost:3000',
  default: 'http://localhost:3000',
});

export const ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || DEFAULT_HOST,
  API_TIMEOUT_MS: 30000, // 30 detik karena proses scan AI Gemini + BugGuide membutuhkan waktu
};

