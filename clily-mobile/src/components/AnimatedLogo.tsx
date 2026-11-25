import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

import LeafTop from '../assets/logo/logo-leaf-top.svg';
import LeafBottom from '../assets/logo/logo-leaf-bottom.svg';
import Wing from '../assets/logo/logo-wing.svg';
import { useDesignScale } from '../theme/useDesignScale';

const LOGO_PNG = require('../assets/logo/logo-full.png');

// Logo group measured from Figma "opening / Variant11" (origin at x=31, y=370 of the 412 × 917 frame)
const BOX = { width: 350, height: 164 };
const WING = { width: 174.5, height: 83.4659 };
const LEAF_X = 169;
const DOT_SIZE = 18;
const LEAF_GREEN = '#27B98E'; // matches the leaf SVGs; only used for the intro dot

type Props = {
  /** Called once the full reveal has played */
  onFinish?: () => void;
};

/**
 * Clily logo reveal (Figma: "opening" component, 11 variants):
 * green dot → two leaves → wings spread in → "clily" wordmark.
 */
export function AnimatedLogo({ onFinish }: Props) {
  const { sx } = useDesignScale();
  const dot = useRef(new Animated.Value(0)).current;
  const leaves = useRef(new Animated.Value(0)).current;
  const wings = useRef(new Animated.Value(0)).current;
  const wordmark = useRef(new Animated.Value(0)).current;
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    const ease = Easing.out(Easing.cubic);
    const animation = Animated.sequence([
      Animated.timing(dot, { toValue: 1, duration: 300, easing: ease, useNativeDriver: true }),
      Animated.timing(leaves, { toValue: 1, duration: 450, easing: Easing.out(Easing.back(1.6)), useNativeDriver: true }),
      Animated.timing(wings, { toValue: 1, duration: 700, easing: ease, useNativeDriver: true }),
      Animated.timing(wordmark, { toValue: 1, duration: 450, easing: ease, useNativeDriver: true }),
    ]);
    animation.start(({ finished }) => finished && onFinishRef.current?.());
    return () => animation.stop();
  }, [dot, leaves, wings, wordmark]);

  /** Wings start near the center (+60 for the left wing, -60 for the right) and spread outward. */
  const wingSlide = (direction: 1 | -1) =>
    wings.interpolate({ inputRange: [0, 1], outputRange: [direction * 60, 0] });
  const wingScale = wings.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });

  return (
    <View
      style={{ width: BOX.width, height: BOX.height, transform: [{ scale: sx }] }}
      accessible
      accessibilityRole="image"
      accessibilityLabel="Logo clily"
    >
      {/* Left wing is the right wing mirrored, as in Figma */}
      <Animated.View
        style={[
          styles.abs,
          { left: 0, top: 2, opacity: wings },
          { transform: [{ translateX: wingSlide(1) }, { scaleX: -1 }, { scale: wingScale }] },
        ]}
      >
        <Wing width={WING.width} height={WING.height} />
      </Animated.View>
      <Animated.View
        style={[
          styles.abs,
          { left: 175, top: 1.51, opacity: wings },
          { transform: [{ translateX: wingSlide(-1) }, { scale: wingScale }] },
        ]}
      >
        <Wing width={WING.width} height={WING.height} />
      </Animated.View>

      {/* Intro dot sits where the leaves meet, then hands over to the leaves */}
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: leaves.interpolate({ inputRange: [0, 0.4], outputRange: [1, 0], extrapolate: 'clamp' }),
            transform: [{ scale: dot }],
          },
        ]}
      />
      <Animated.View
        style={[styles.abs, { left: LEAF_X, top: 0, opacity: leaves, transform: [{ scaleY: leaves }] }]}
      >
        <LeafTop width={11} height={48} />
      </Animated.View>
      <Animated.View
        style={[styles.abs, { left: LEAF_X, top: 54, opacity: leaves, transform: [{ scaleY: leaves }] }]}
      >
        <LeafBottom width={11} height={35} />
      </Animated.View>

      {/* Wordmark: Figma crops the full logo PNG to show only "clily" */}
      <Animated.View
        style={[
          styles.wordmark,
          {
            opacity: wordmark,
            transform: [{ translateY: wordmark.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
          },
        ]}
      >
        <Image source={LOGO_PNG} style={styles.wordmarkImage} resizeMode="stretch" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
  },
  dot: {
    position: 'absolute',
    left: LEAF_X + 5.5 - DOT_SIZE / 2,
    top: 51 - DOT_SIZE / 2,
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: LEAF_GREEN,
  },
  wordmark: {
    position: 'absolute',
    left: 21,
    top: 95,
    width: 308,
    height: 69,
    overflow: 'hidden',
  },
  wordmarkImage: {
    position: 'absolute',
    left: 0,
    top: -148,
    width: 308.06,
    height: 236,
  },
});
