import { create } from 'zustand';

import { MOCK_GALLERY } from '../mocks/gallery';
import type { GalleryFilters, GalleryItem } from '../types/scan.types';

const EMPTY: GalleryFilters = { kingdom: [], habitat: [], status: [] };

type GalleryState = {
  /** Newest first. Seeded with the Figma gallery; scans from the camera are added on top. */
  items: GalleryItem[];
  applied: GalleryFilters;
  draft: GalleryFilters;
  add: (item: GalleryItem) => void;
  toggle: (group: keyof GalleryFilters, value: string) => void;
  startEditing: () => void;
  apply: () => void;
  reset: () => void;
};

export const useGalleryStore = create<GalleryState>((set) => ({
  items: MOCK_GALLERY,
  applied: EMPTY,
  draft: EMPTY,
  add: (item) => set((state) => ({ items: [item, ...state.items] })),
  toggle: (group, value) =>
    set((state) => {
      const current = state.draft[group] as string[];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { draft: { ...state.draft, [group]: next } };
    }),
  startEditing: () => set((state) => ({ draft: state.applied })),
  apply: () => set((state) => ({ applied: state.draft })),
  reset: () => set({ applied: EMPTY, draft: EMPTY }),
}));

const matchesAny = (selected: string[], values: string[]) =>
  selected.length === 0 || selected.some((v) => values.includes(v));

/** OR within a group, AND across groups (same rule as the Ensiklopedia filter). */
export function filterGallery(items: GalleryItem[], f: GalleryFilters): GalleryItem[] {
  return items.filter(
    (i) => matchesAny(f.kingdom, [i.kingdom]) && matchesAny(f.habitat, i.habitat) && matchesAny(f.status, [i.status]),
  );
}

export const hasGalleryFilters = (f: GalleryFilters) => f.kingdom.length + f.habitat.length + f.status.length > 0;
