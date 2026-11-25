import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, fontSizes } from '../theme/tokens';

type Props = {
  onResend: () => void;
  seconds?: number;
};

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * "Kirim ulang kode dalam 00:45" counting down, then a "Kirim ulang kode" link
 * (Figma: "countdown" component, 00:45 → 00:01 → link).
 */
export function ResendCountdown({ onResend, seconds = 45 }: Props) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining]);

  if (remaining > 0) {
    return (
      <Text style={styles.waiting} accessibilityLiveRegion="polite">
        Kirim ulang kode dalam {pad(Math.floor(remaining / 60))}:{pad(remaining % 60)}
      </Text>
    );
  }

  return (
    <Pressable
      onPress={() => {
        onResend();
        setRemaining(seconds);
      }}
      accessibilityRole="button"
      hitSlop={10}
    >
      <Text style={styles.link}>Kirim ulang kode</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  waiting: {
    color: colors.navyMuted,
    fontFamily: fonts.extraBold,
    fontSize: fontSizes.description,
    textAlign: 'center',
  },
  link: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: fontSizes.description,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
