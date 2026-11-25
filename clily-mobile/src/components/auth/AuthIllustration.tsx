import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import CheckIcon from '../../assets/icons/check.svg';
import { colors, fonts, shadows } from '../../theme/tokens';

/** White 217px circle with a soft shadow that frames the verification illustrations. */
export function IllustrationCircle({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.circle, style]}>{children}</View>;
}

type BadgeProps = {
  kind: 'question' | 'check';
  style?: StyleProp<ViewStyle>;
};

/**
 * Small mint circle on the lock illustration: "?" on Lupa Password, a check on
 * Buat Password Baru. (Figma adds a subtle noise texture; it is drawn flat here.)
 */
export function LockBadge({ kind, style }: BadgeProps) {
  return (
    <View style={[styles.badge, style]}>
      {kind === 'question' ? (
        <Text style={styles.question}>?</Text>
      ) : (
        <CheckIcon width={35.8589} height={25.3718} />
      )}
    </View>
  );
}

const CIRCLE = 217;
const BADGE = 50;

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: colors.white,
    alignSelf: 'center',
    ...shadows.raised,
  },
  badge: {
    position: 'absolute',
    width: BADGE,
    height: BADGE,
    borderRadius: BADGE / 2,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 40,
    lineHeight: 48,
  },
});
