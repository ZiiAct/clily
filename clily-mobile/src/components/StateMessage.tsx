import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts } from '../theme/tokens';

type Props = {
  message: string;
  /** e.g. "Coba lagi" or "Hapus semua filter" */
  actionLabel?: string;
  onAction?: () => void;
  /** dark: navy text on light screens. light: mint text on navy/teal surfaces. */
  tone?: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
};

/** Shared empty / error state: a short message and an optional pill button. */
export function StateMessage({ message, actionLabel, onAction, tone = 'dark', style }: Props) {
  const light = tone === 'light';
  return (
    <View style={[styles.container, style]} accessibilityLiveRegion="polite">
      <Text style={[styles.message, light && styles.messageLight]}>{message}</Text>
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          hitSlop={6}
          style={({ pressed }) => [styles.button, light && styles.buttonLight, pressed && styles.pressed]}
        >
          <Text style={[styles.buttonLabel, light && styles.buttonLabelLight]}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

/** Standard copy for a failed request. */
export const errorMessage = (what: string) => `${what} gagal dimuat. Periksa koneksi internetmu.`;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 14,
  },
  message: {
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  messageLight: {
    color: colors.mint,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 22,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLight: {
    borderColor: colors.mint,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonLabel: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 14,
  },
  buttonLabelLight: {
    color: colors.mint,
  },
});
