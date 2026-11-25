import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, fonts, fontSizes, layout, radius } from '../theme/tokens';

type Variant = 'primary' | 'light' | 'outline';

type Props = {
  label: string;
  onPress: () => void;
  /**
   * primary: navy fill, light text (Masuk, Daftar, Selanjutnya)
   * light: mint fill, navy text (Welcome → Masuk)
   * outline: mint border, light text (Welcome → Daftar Akun)
   */
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, variant = 'primary', loading, disabled, style }: Props) {
  const inactive = disabled || loading;
  const textColor = variant === 'light' ? colors.navy : colors.onDark;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        inactive && styles.inactive,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: layout.fieldHeight,
    borderRadius: radius.input,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.navy,
  },
  light: {
    backgroundColor: colors.mint,
  },
  outline: {
    borderWidth: 2,
    borderColor: colors.mint,
  },
  pressed: {
    opacity: 0.85,
  },
  inactive: {
    opacity: 0.6,
  },
  label: {
    fontFamily: fonts.extraBold,
    fontSize: fontSizes.input,
  },
});
