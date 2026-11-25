import { create } from 'zustand';

import { EMPTY_FILTERS, type SpeciesFilters } from '../types/species.types';

type FilterGroup = keyof SpeciesFilters;

type FilterState = {
  /** Filters used by the results screen */
  applied: SpeciesFilters;
  /** Selections in the open filter sheet, applied on "Terapkan Filter" */
  draft: SpeciesFilters;
  toggle: <G extends FilterGroup>(group: G, value: SpeciesFilters[G][number]) => void;
  /** Copy applied → draft when the sheet opens */
  startEditing: () => void;
  apply: () => void;
  reset: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  applied: EMPTY_FILTERS,
  draft: EMPTY_FILTERS,
  toggle: (group, value) =>
    set((state) => {
      const current = state.draft[group] as string[];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { draft: { ...state.draft, [group]: next } };
    }),
  startEditing: () => set((state) => ({ draft: state.applied })),
  apply: () => set((state) => ({ applied: state.draft })),
  reset: () => set({ applied: EMPTY_FILTERS, draft: EMPTY_FILTERS }),
}));

export const hasActiveFilters = (f: SpeciesFilters) =>
  f.habitat.length + f.diet.length + f.traits.length + f.status.length > 0;
