import { create } from 'zustand';

import type { User } from '../types/user.types';

type AuthState = {
  user: User | null;
  /** Mock login: any non-empty username + password succeeds. */
  login: (username: string, password: string) => Promise<void>;
  /** Mock register: creates a local user and signs in. */
  register: (input: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

/** Simulated network delay so loading states are visible. */
const fakeDelay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

const mockUser = (username: string, email: string): User => ({
  id: 'mock-user',
  username,
  email,
  avatarUrl: null,
  language: 'id',
  xp: 50,
  title: 'Kontributor Aktif',
  xpToNext: 150,
});

/**
 * Frontend-only auth state. Replace the bodies of login/register with calls to
 * src/api once the backend exists; screens only use this store.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (username) => {
    await fakeDelay();
    set({ user: mockUser(username, `${username}@contoh.id`) });
  },
  register: async ({ username, email }) => {
    await fakeDelay();
    set({ user: mockUser(username, email) });
  },
  logout: () => set({ user: null }),
}));
