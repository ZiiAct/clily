import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts, radius, shadows } from '../theme/tokens';

type Props = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
};

/**
 * Row of single-digit boxes (Figma: "kode verifikasi input", 4 × 64.6px boxes).
 * One hidden TextInput holds the value so paste and SMS autofill work.
 */
export function CodeInput({ value, onChange, length = 4, autoFocus }: Props) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = (text: string) => onChange(text.replace(/\D/g, '').slice(0, length));

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      accessibilityRole="none"
      style={styles.row}
    >
      {Array.from({ length }, (_, i) => {
        const isActive = focused && i === Math.min(value.length, length - 1);
        return (
          <View key={i} style={[styles.box, isActive && styles.boxActive]}>
            <Text style={styles.digit}>{value[i] ?? ''}</Text>
          </View>
        );
      })}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        autoFocus={autoFocus}
        caretHidden
        accessibilityLabel={`Kode verifikasi ${length} digit`}
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}

const BOX = 64.64;

const styles = StyleSheet.create({
  row: {
    width: 295,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: BOX,
    height: BOX,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
  boxActive: {
    borderColor: colors.green,
    borderWidth: 2,
  },
  digit: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 28,
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
});
