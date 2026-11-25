import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, gradients, shadows } from '../../theme/tokens';

type Props = {
  label: string;
  onPress: () => void;
  /** Figma uses ink (#1A4F76) for "Baca lebih banyak" and navy for "Masuk". */
  color?: string;
  style?: StyleProp<ViewStyle>;
};

/** Mint → white rounded button used on Beranda cards (207 × 39). */
export function PillButton({ label, onPress, color = colors.navy, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <LinearGradient colors={gradients.pillButton} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.fill} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 207,
    height: 39,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mint,
    ...shadows.thumbnail,
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: fonts.poppinsExtraBold,
    fontSize: 12,
  },
});
