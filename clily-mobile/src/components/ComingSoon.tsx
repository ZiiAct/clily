import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '../theme/tokens';

type Props = {
  title: string;
  phase: number;
};

/** Temporary body for routes whose screen is built in a later phase. */
export function ComingSoon({ title, phase }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.note}>Layar ini dibangun di Phase {phase}.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  title: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 24,
    textAlign: 'center',
  },
  note: {
    marginTop: spacing.sm,
    color: colors.textMuted,
    fontFamily: fonts.medium,
    fontSize: 13,
    textAlign: 'center',
  },
});
