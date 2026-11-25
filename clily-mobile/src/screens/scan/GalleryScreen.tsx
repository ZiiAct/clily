import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChecklistSheet, type ChecklistGroup } from '../../components/ChecklistSheet';
import { FilterChip } from '../../components/FilterChip';
import { ScreenHeader } from '../../components/ScreenHeader';
import { GalleryCard } from '../../components/scan/GalleryCard';
import { filterGallery, hasGalleryFilters, useGalleryStore } from '../../store/galleryStore';
import { colors, fonts, gradients } from '../../theme/tokens';
import type { GalleryFilters } from '../../types/scan.types';

/** Groups from the Figma "filter galeri" sheet. */
const GROUPS: ChecklistGroup[] = [
  {
    key: 'kingdom',
    title: 'Kingdom',
    options: [
      { value: 'animalia', label: 'Animalia' },
      { value: 'fungi', label: 'Fungi' },
      { value: 'plantae', label: 'Plantae' },
    ],
  },
  {
    key: 'habitat',
    title: 'Habitat',
    options: [
      { value: 'rumahan', label: 'Rumahan' },
      { value: 'hutan-kecil', label: 'Hutan Kecil' },
      { value: 'perkebunan', label: 'Perkebunan' },
      { value: 'hutan-besar', label: 'Hutan Besar' },
      { value: 'darat', label: 'Darat' },
      { value: 'udara', label: 'Udara' },
      { value: 'air', label: 'Air' },
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

// Figma: two 180px cards with an 18px gap, 17px side margins.
const SIDE = 17;
const GAP = 18;

type Props = {
  onOpenItem: (id: string) => void;
};

/** Galeri Fotomu (Figma: Galeri). */
export function GalleryScreen({ onOpenItem }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [sheetOpen, setSheetOpen] = useState(false);
  const items = useGalleryStore((s) => s.items);
  const applied = useGalleryStore((s) => s.applied);
  const draft = useGalleryStore((s) => s.draft);
  const toggle = useGalleryStore((s) => s.toggle);
  const startEditing = useGalleryStore((s) => s.startEditing);
  const apply = useGalleryStore((s) => s.apply);
  const reset = useGalleryStore((s) => s.reset);

  const visible = filterGallery(items, applied);
  const filtered = hasGalleryFilters(applied);
  const cardWidth = Math.min(180, (width - SIDE * 2 - GAP) / 2);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient colors={gradients.speciesScreen} style={StyleSheet.absoluteFill} />
      <ScreenHeader title="Galeri Fotomu" />

      <FlatList
        data={visible}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 60 }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <FilterChip
            filled
            active={filtered}
            onPress={() => {
              startEditing();
              setSheetOpen(true);
            }}
            style={styles.filter}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{filtered ? 'Tidak ada foto yang cocok dengan filter.' : 'Belum ada foto. Scan serangga dengan kamera.'}</Text>
            {filtered && (
              <Text style={styles.emptyLink} onPress={reset} accessibilityRole="button">
                Hapus semua filter
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => <GalleryCard item={item} width={cardWidth} onPress={() => onOpenItem(item.id)} />}
      />

      <LinearGradient colors={gradients.navyFade} style={[styles.fade, { height: 51 + insets.bottom }]} pointerEvents="none" />

      <ChecklistSheet
        visible={sheetOpen}
        groups={GROUPS}
        selected={draft}
        onToggle={(group, value) => toggle(group as keyof GalleryFilters, value)}
        onApply={() => {
          apply();
          setSheetOpen(false);
        }}
        onClose={() => setSheetOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingTop: 21,
  },
  filter: {
    marginLeft: 21,
    marginBottom: 30,
  },
  row: {
    justifyContent: 'center',
    gap: GAP,
    marginBottom: GAP,
  },
  empty: {
    marginTop: 60,
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  emptyLink: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
