import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SheetHandle from '../assets/icons/sheet-handle.svg';
import { colors, fonts, gradients, shadows } from '../theme/tokens';

export type ChecklistGroup = {
  key: string;
  title: string;
  options: { value: string; label: string }[];
};

type Props = {
  visible: boolean;
  groups: ChecklistGroup[];
  /** Selected values per group key */
  selected: Record<string, string[]>;
  onToggle: (groupKey: string, value: string) => void;
  onApply: () => void;
  onClose: () => void;
};

/**
 * "Filter Pencarian" bottom sheet (Figma: slide bar / filter galeri).
 * Two-column checkbox groups and a "Terapkan Filter" button.
 */
export function ChecklistSheet({ visible, groups, selected, onToggle, onApply, onClose }: Props) {
  const insets = useSafeAreaInsets();

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

          {groups.map((group) => (
            <View key={group.key} style={styles.group}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <View style={styles.grid}>
                {group.options.map((option) => {
                  const checked = (selected[group.key] ?? []).includes(option.value);
                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => onToggle(group.key, option.value)}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked }}
                      accessibilityLabel={option.label}
                      style={styles.option}
                    >
                      <View style={[styles.box, checked && styles.boxChecked]}>{checked && <View style={styles.tick} />}</View>
                      <Text style={styles.optionLabel}>{option.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}

          <Pressable onPress={onApply} accessibilityRole="button" style={({ pressed }) => [styles.applyButton, pressed && styles.pressed]}>
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
