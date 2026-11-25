import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SheetHandle from '../../assets/icons/sheet-handle.svg';
import { useFilterStore } from '../../store/filterStore';
import { colors, fonts, gradients, shadows } from '../../theme/tokens';
import type { SpeciesFilters } from '../../types/species.types';

type Option<G extends keyof SpeciesFilters> = { value: SpeciesFilters[G][number]; label: string };

/** Filter groups and options in Figma order (two columns, filled row by row). */
const GROUPS: { [G in keyof SpeciesFilters]: { title: string; options: Option<G>[] } } = {
  habitat: {
    title: 'Habitat',
    options: [
      { value: 'darat', label: 'Darat' },
      { value: 'laut', label: 'Laut' },
      { value: 'air-tawar', label: 'Air Tawar' },
      { value: 'hutan', label: 'Hutan' },
    ],
  },
  diet: {
    title: 'Makanan',
    options: [
      { value: 'herbivora', label: 'Herbivora' },
      { value: 'omnivora', label: 'Omnivora' },
      { value: 'karnivora', label: 'Karnivora' },
    ],
  },
  traits: {
    title: 'Ciri Khas',
    options: [
      { value: 'terbang', label: 'Bisa Terbang' },
      { value: 'nokturnal', label: 'Nokturnal' },
      { value: 'berbisa', label: 'Berbisa' },
    ],
  },
  status: {
    title: 'Status Konservasi',
    options: [
      { value: 'terancam', label: 'Terancam' },
      { value: 'risiko-rendah', label: 'Risiko Rendah' },
      { value: 'rentan', label: 'Rentan' },
    ],
  },
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
};

/** "Filter Pencarian" bottom sheet (Figma: slide bar). Multi-select; applied to the store on "Terapkan Filter". */
export function FilterSheet({ visible, onClose, onApply }: Props) {
  const insets = useSafeAreaInsets();
  const draft = useFilterStore((s) => s.draft);
  const toggle = useFilterStore((s) => s.toggle);
  const apply = useFilterStore((s) => s.apply);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Tutup filter" />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}>
        <LinearGradient colors={gradients.sheet} locations={[0, 0.28, 1]} style={[StyleSheet.absoluteFill, styles.sheetFill]} />
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Tutup filter" hitSlop={12} style={styles.handle}>
          <SheetHandle width={37} height={3} />
        </Pressable>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text accessibilityRole="header" style={styles.title}>
            Filter Pencarian
          </Text>
          <Text style={styles.subtitle}>Cari berdasarkan</Text>

          {(Object.keys(GROUPS) as (keyof SpeciesFilters)[]).map((group) => (
            <View key={group} style={styles.group}>
              <Text style={styles.groupTitle}>{GROUPS[group].title}</Text>
              <View style={styles.grid}>
                {GROUPS[group].options.map((option) => {
                  const checked = (draft[group] as string[]).includes(option.value);
                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => toggle(group, option.value as never)}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked }}
                      accessibilityLabel={option.label}
                      style={styles.option}
                    >
                      <View style={[styles.box, checked && styles.boxChecked]}>
                        {checked && <View style={styles.tick} />}
                      </View>
                      <Text style={styles.optionLabel}>{option.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}

          <Pressable
            onPress={() => {
              apply();
              onApply();
            }}
            accessibilityRole="button"
            style={({ pressed }) => [styles.applyButton, pressed && styles.pressed]}
          >
            <Text style={styles.applyLabel}>Terapkan Filter</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdrop,
  },
  sheet: {
    maxHeight: '88%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white,
    ...shadows.header,
  },
  sheetFill: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 9,
  },
  title: {
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  subtitle: {
    marginTop: 10,
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  group: {
    marginTop: 30,
  },
  groupTitle: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  grid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 13,
  },
  option: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.green,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: colors.green,
  },
  tick: {
    width: 11,
    height: 6,
    marginTop: -3,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.white,
    transform: [{ rotate: '-45deg' }],
  },
  optionLabel: {
    marginLeft: 10,
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  applyButton: {
    alignSelf: 'center',
    marginTop: 30,
    width: 139,
    height: 41,
    borderRadius: 50,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  applyLabel: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
});
