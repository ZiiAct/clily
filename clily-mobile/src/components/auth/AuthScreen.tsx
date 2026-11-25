import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { layout } from '../../theme/tokens';
import { useDesignScale } from '../../theme/useDesignScale';

type Props = {
  /** Absolutely positioned decoration behind the content */
  background: React.ReactNode;
  /** Status bar text color: light on navy tops, dark on mint tops */
  statusBar: 'light' | 'dark';
  /** Figma y position where the content column starts (412 × 917 frame) */
  contentTop: number;
  children: React.ReactNode;
  /** Pinned to the bottom of the screen (primary button + footer link) */
  footer?: React.ReactNode;
  /** Floating controls above everything, e.g. a back button */
  overlay?: React.ReactNode;
};

/** Shared layout for the sign-in screens: background, scrollable form, bottom footer. */
export function AuthScreen({ background, statusBar, contentTop, children, footer, overlay }: Props) {
  const insets = useSafeAreaInsets();
  const { y } = useDesignScale();

  return (
    <View style={styles.screen}>
      <StatusBar style={statusBar} />
      {background}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: Math.max(y(contentTop), insets.top + 16),
              paddingBottom: Math.max(y(64), insets.bottom + 16),
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
          <View style={styles.spacer} />
          {footer}
        </ScrollView>
      </KeyboardAvoidingView>
      {overlay}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: layout.authPadding,
  },
  spacer: {
    flexGrow: 1,
    minHeight: 32,
  },
});
