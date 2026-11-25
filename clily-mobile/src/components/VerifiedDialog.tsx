import React, { useEffect, useRef } from 'react';
import { Animated, Modal, StyleSheet, Text, View } from 'react-native';

import VerifiedDot from '../assets/icons/verified-dot.svg';
import VerifiedCheck from '../assets/icons/verified-check.svg';
import { colors, fonts, radius } from '../theme/tokens';

type Props = {
  visible: boolean;
  message: string;
  /** Called after the animation finishes and the dialog has been shown briefly. */
  onDone: () => void;
};

const ICON = 65.5554;
const HOLD_MS = 900;

/**
 * Success popup (Figma: "VALIDASI VERIF"). The icon animates like the Figma
 * "Group 85" variants: small dot → filled circle with a check.
 */
export function VerifiedDialog({ visible, message, onDone }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!visible) {
      progress.setValue(0);
      return;
    }
    const animation = Animated.sequence([
      Animated.delay(150),
      Animated.spring(progress, { toValue: 1, useNativeDriver: true, friction: 6 }),
      Animated.delay(HOLD_MS),
    ]);
    animation.start(({ finished }) => finished && onDoneRef.current());
    return () => animation.stop();
  }, [visible, progress]);

  const dotOpacity = progress.interpolate({ inputRange: [0, 0.5], outputRange: [1, 0], extrapolate: 'clamp' });
  const checkOpacity = progress.interpolate({ inputRange: [0.2, 0.6], outputRange: [0, 1], extrapolate: 'clamp' });
  const checkScale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] });

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.backdrop}>
        <View style={styles.card} accessibilityRole="alert" accessibilityLabel={message}>
          <View style={styles.icon}>
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: dotOpacity }]}>
              <VerifiedDot width={ICON} height={ICON} />
            </Animated.View>
            <Animated.View
              style={[StyleSheet.absoluteFill, { opacity: checkOpacity, transform: [{ scale: checkScale }] }]}
            >
              <VerifiedCheck width={ICON} height={ICON} />
            </Animated.View>
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdrop,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 332,
    height: 198,
    borderRadius: radius.card,
    backgroundColor: colors.onDark,
    alignItems: 'center',
    paddingTop: 43,
  },
  icon: {
    width: ICON,
    height: ICON,
  },
  message: {
    marginTop: 23,
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 20,
    textAlign: 'center',
  },
});
