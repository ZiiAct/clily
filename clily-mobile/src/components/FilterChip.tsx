import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import FilterIcon from '../assets/icons/filter.svg';
import { colors, fonts, fontSizes, radius } from '../theme/tokens';

type Props = {
  label?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Green-outlined pill that opens the filter sheet (Figma: Component 3). */
export function FilterChip({ label = 'Filter', onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={{ top: 8, bottom: 8 }}
      style={({ pressed }) => [styles.chip, pressed && styles.pressed, style]}
    >
      <FilterIcon width={22} height={20} />
      <Text style={styles.label}>{label}</Text>
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
  pressed: {
    opacity: 0.7,
  },
  label: {
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
  },
});
