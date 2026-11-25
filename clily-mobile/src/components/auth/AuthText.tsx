import React from 'react';
import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';

import { colors, fonts, fontSizes } from '../../theme/tokens';

type TextProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  center?: boolean;
};

/** 40px ExtraBold navy title ("Selamat Datang Kembali!", "Daftar", "Lupa Password") */
export function AuthTitle({ children, style, center }: TextProps) {
  return (
    <Text accessibilityRole="header" style={[styles.title, center && styles.center, style]}>
      {children}
    </Text>
  );
}

/** 20px ExtraBold muted navy subtitle ("Masuk ke akun anda") */
export function AuthSubtitle({ children, style, center }: TextProps) {
  return <Text style={[styles.subtitle, center && styles.center, style]}>{children}</Text>;
}

/** 14px ExtraBold muted navy paragraph, justified as in Figma */
export function AuthDescription({ children, style, center }: TextProps) {
  return (
    <Text style={[styles.description, center ? styles.center : styles.justify, style]}>{children}</Text>
  );
}

type FooterLinkProps = {
  prompt: string;
  action: string;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
};

/** "Belum punya akun? **Daftar**" — regular prompt with a bold underlined action */
export function FooterLink({ prompt, action, onPress, style }: FooterLinkProps) {
  return (
    <Text style={[styles.footer, style]}>
      {prompt}{' '}
      <Text onPress={onPress} accessibilityRole="link" style={styles.footerAction} suppressHighlighting>
        {action}
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: fontSizes.display,
  },
  subtitle: {
    color: colors.navyMuted,
    fontFamily: fonts.extraBold,
    fontSize: fontSizes.subtitle,
  },
  description: {
    color: colors.navyMuted,
    fontFamily: fonts.extraBold,
    fontSize: fontSizes.description,
  },
  center: {
    textAlign: 'center',
  },
  justify: {
    textAlign: 'justify',
  },
  footer: {
    marginTop: 5,
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: fontSizes.input,
  },
  footerAction: {
    fontFamily: fonts.extraBold,
    textDecorationLine: 'underline',
  },
});
