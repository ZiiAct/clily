import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from './Button';
import { colors, fonts, gradients } from '../theme/tokens';

type Props = {
  onRetry: () => void;
  details?: string;
};

/** Friendly full-screen fallback when a screen crashes (used by the root ErrorBoundary). */
export function ErrorScreen({ onRetry, details }: Props) {
  return (
    <View style={styles.screen}>
      <LinearGradient colors={gradients.speciesScreen} style={StyleSheet.absoluteFill} />
      <Text accessibilityRole="header" style={styles.title}>
        Ups, ada yang salah
      </Text>
      <Text style={styles.message}>Halaman ini tidak dapat ditampilkan. Coba lagi, atau kembali ke Beranda.</Text>
      {__DEV__ && details ? <Text style={styles.details}>{details}</Text> : null}
      <Button label="Coba lagi" onPress={onRetry} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 24,
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  details: {
    marginTop: 12,
    textAlign: 'center',
    color: colors.navyMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  button: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
});
