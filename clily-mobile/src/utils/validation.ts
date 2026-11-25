/** Form validation shared by the sign-in screens. Messages are shown under each field. */

export const PASSWORD_MIN = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRequired(value: string, label: string): string | undefined {
  return value.trim() ? undefined : `${label} wajib diisi.`;
}

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'Email wajib diisi.';
  return EMAIL_PATTERN.test(value.trim()) ? undefined : 'Format email tidak valid.';
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Password wajib diisi.';
  return value.length >= PASSWORD_MIN ? undefined : `Password minimal ${PASSWORD_MIN} karakter.`;
}

export function validatePasswordMatch(password: string, confirmation: string): string | undefined {
  if (!confirmation) return 'Konfirmasi password wajib diisi.';
  return password === confirmation ? undefined : 'Password tidak sama.';
}
