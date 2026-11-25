import React from 'react';

import { ChecklistSheet, type ChecklistGroup } from '../ChecklistSheet';
import { useFilterStore } from '../../store/filterStore';
import type { SpeciesFilters } from '../../types/species.types';

/** Filter groups and options in Figma order (two columns, filled row by row). */
const GROUPS: ChecklistGroup[] = [
  {
    key: 'habitat',
    title: 'Habitat',
    options: [
      { value: 'darat', label: 'Darat' },
      { value: 'laut', label: 'Laut' },
      { value: 'air-tawar', label: 'Air Tawar' },
      { value: 'hutan', label: 'Hutan' },
    ],
  },
  {
    key: 'diet',
    title: 'Makanan',
    options: [
      { value: 'herbivora', label: 'Herbivora' },
      { value: 'omnivora', label: 'Omnivora' },
      { value: 'karnivora', label: 'Karnivora' },
    ],
  },
  {
    key: 'traits',
    title: 'Ciri Khas',
    options: [
      { value: 'terbang', label: 'Bisa Terbang' },
      { value: 'nokturnal', label: 'Nokturnal' },
      { value: 'berbisa', label: 'Berbisa' },
    ],
  },
  {
    key: 'status',
    title: 'Status Konservasi',
    options: [
      { value: 'terancam', label: 'Terancam' },
      { value: 'risiko-rendah', label: 'Risiko Rendah' },
      { value: 'rentan', label: 'Rentan' },
    ],
  },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
};

/** Ensiklopedia filter sheet (Figma: slide bar), backed by the filter store. */
export function FilterSheet({ visible, onClose, onApply }: Props) {
  const draft = useFilterStore((s) => s.draft);
  const toggle = useFilterStore((s) => s.toggle);
  const apply = useFilterStore((s) => s.apply);

  return (
    <ChecklistSheet
      visible={visible}
      groups={GROUPS}
      selected={draft}
      onToggle={(group, value) => toggle(group as keyof SpeciesFilters, value as never)}
      onApply={() => {
        apply();
        onApply();
      }}
      onClose={onClose}
    />
  );
}
