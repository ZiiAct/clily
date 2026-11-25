import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedLogo } from '../../components/AnimatedLogo';
import { BackgroundBubbles, BUBBLES } from '../../components/BackgroundBubbles';
import { colors, fonts, fontSizes, gradients } from '../../theme/tokens';

type Props = {
  onContinue: () => void;
};

/** Splash (Figma: "load screen" + "opening" animation). Tap anywhere to continue. */
export function SplashScreen({ onContinue }: Props) {
  const insets = useSafeAreaInsets();
  const [revealed, setRevealed] = useState(false);

  return (
    <Pressable
      style={styles.screen}
      onPress={onContinue}
      accessibilityRole="button"
      accessibilityLabel="Klik untuk melanjutkan"
    >
      <StatusBar style="dark" />
      <LinearGradient colors={gradients.splash} locations={[0, 0.5, 1]} style={StyleSheet.absoluteFill} />
      <BackgroundBubbles bubbles={BUBBLES.splash} />

      <View style={styles.center}>
        <AnimatedLogo onFinish={() => setRevealed(true)} />
      </View>

      <Text style={[styles.hint, { bottom: insets.bottom + 31, opacity: revealed ? 1 : 0 }]}>
        klik untuk melanjutkan
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    position: 'absolute',
    alignSelf: 'center',
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: fontSizes.input,
  },
});
