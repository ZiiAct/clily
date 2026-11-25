import React, { createContext, useContext, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';

/** One shared pulse so every block on a screen fades in sync. */
const PulseContext = createContext<Animated.Value | null>(null);

type GroupProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Accessible label announced instead of the individual blocks */
  label?: string;
};

/** Wrap skeleton blocks so they share one animation and announce a single "loading" label. */
export function SkeletonGroup({ children, style, label = 'Memuat' }: GroupProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <PulseContext.Provider value={pulse}>
      <View style={style} accessible accessibilityRole="progressbar" accessibilityLabel={label}>
        {children}
      </View>
    </PulseContext.Provider>
  );
}

type BlockProps = {
  width?: DimensionValue;
  /** Omit when the size comes from `style` (e.g. aspectRatio) */
  height?: DimensionValue;
  radius?: number;
  /** light: on mint/white screens. dark: on navy/teal surfaces. */
  tone?: 'light' | 'dark';
  style?: StyleProp<ViewStyle>;
};

/** A pulsing placeholder block shaped like the content that is loading. */
export function Skeleton({ width = '100%', height, radius = 15, tone = 'light', style }: BlockProps) {
  const pulse = useContext(PulseContext);
  const opacity = pulse ? pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.9] }) : 0.7;

  return (
    <Animated.View
      style={[
        styles.block,
        { width, height, borderRadius: radius, opacity },
        tone === 'dark' ? styles.dark : styles.light,
        style,
      ]}
    />
  );
}

/** A few lines of text-shaped placeholders; the last line is shorter. */
export function SkeletonLines({ lines = 3, lineHeight = 14, gap = 8, tone }: { lines?: number; lineHeight?: number; gap?: number; tone?: 'light' | 'dark' }) {
  return (
    <View style={{ gap }}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} height={lineHeight} radius={6} tone={tone} width={i === lines - 1 ? '60%' : '100%'} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    overflow: 'hidden',
  },
  light: {
    backgroundColor: 'rgba(18, 65, 112, 0.12)',
  },
  dark: {
    backgroundColor: 'rgba(221, 244, 231, 0.25)',
  },
});
