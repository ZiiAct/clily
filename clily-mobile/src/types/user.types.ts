/** User entity from the PRD data model (section 5). */
export type User = {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatarUrl: string | null;
  language: 'id' | 'en';
  xp: number;
  /** Contributor level, e.g. "Kontributor Aktif" */
  title: string;
  /** XP still needed to reach the next title */
  xpToNext: number;
};
