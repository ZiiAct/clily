import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import FilterIcon from '../assets/icons/filter.svg';
import FilterIconLight from '../assets/icons/filter-light.svg';
import { colors, fonts, fontSizes, radius } from '../theme/tokens';

type Props = {
  label?: string;
  onPress?: () => void;
  /** dark: navy text on light backgrounds. light: mint text on dark gradient backgrounds. */
  tone?: 'dark' | 'light';
  /** Shows a small dot when filters are active */
  active?: boolean;
  /** White fill (Figma: Galeri Fotomu) instead of a transparent pill */
  filled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Green-outlined pill that opens the filter sheet (Figma: Component 3). */
export function FilterChip({ label = 'Filter', onPress, tone = 'dark', active, filled, style }: Props) {
  const Icon = tone === 'light' ? FilterIconLight : FilterIcon;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={active ? `${label}, filter aktif` : label}
      hitSlop={{ top: 8, bottom: 8 }}
      style={({ pressed }) => [styles.chip, filled && styles.filled, pressed && styles.pressed, style]}
    >
      <Icon width={22} height={20} />
      <Text style={[styles.label, tone === 'light' && styles.labelLight]}>{label}</Text>
      {active && <View style={styles.dot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingLeft: 11,
    paddingRight: 14,
    borderWidth: 2,
    borderColor: colors.green,
    borderRadius: radius.pill,
  },
  filled: {
    backgroundColor: colors.white,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
  },
  labelLight: {
    color: colors.mint,
  },
  dot: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: colors.green,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
});
