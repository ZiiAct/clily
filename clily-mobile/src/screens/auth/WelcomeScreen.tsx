import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AuthBackground } from '../../components/auth/AuthBackground';
import { Button } from '../../components/Button';
import { colors, fonts, fontSizes, layout, textShadows } from '../../theme/tokens';
import { useDesignScale } from '../../theme/useDesignScale';

type Props = {
  onLogin: () => void;
  onRegister: () => void;
};

/** Onboarding (Figma: "Welcome"). */
export function WelcomeScreen({ onLogin, onRegister }: Props) {
  const { y } = useDesignScale();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <AuthBackground variant="welcome" />

      <Text accessibilityRole="header" style={[styles.title, { marginTop: y(191) }]}>
        Aplikasi terbaik untuk memantau Ekosistem
      </Text>

      <View style={{ marginTop: 'auto', marginBottom: y(917 - 702) }}>
        <Button label="Masuk" variant="light" onPress={onLogin} />
        <Button label="Daftar Akun" variant="outline" onPress={onRegister} style={styles.secondButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: layout.authPadding,
  },
  title: {
    color: colors.onDark,
    fontFamily: fonts.extraBold,
    fontSize: fontSizes.display,
    ...textShadows.display,
  },
  secondButton: {
    marginTop: 12,
  },
});
