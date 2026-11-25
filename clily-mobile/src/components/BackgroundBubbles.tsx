import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/tokens';
import { useDesignScale } from '../theme/useDesignScale';

/** A decorative circle in Figma frame coordinates (412 × 917). */
export type Bubble = {
  x: number;
  y: number;
  size: number;
  opacity: number;
};

type Props = {
  bubbles: readonly Bubble[];
};

/**
 * Transparent green circles behind the splash and auth screens.
 * Every Figma bubble is a plain #67C090 circle, so they are drawn as Views.
 */
export function BackgroundBubbles({ bubbles }: Props) {
  const { x, y, sx } = useDesignScale();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {bubbles.map((b, i) => {
        const size = b.size * sx;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: x(b.x),
              top: y(b.y),
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: colors.green,
              opacity: b.opacity,
            }}
          />
        );
      })}
    </View>
  );
}

/** Bubble layouts copied from each Figma frame. */
export const BUBBLES = {
  splash: [
    { x: 110, y: -65, size: 310, opacity: 0.3 },
    { x: 45, y: 645, size: 348, opacity: 0.3 },
    { x: 254, y: 353, size: 204, opacity: 0.3 },
    { x: -10, y: 422, size: 222, opacity: 0.7 },
    { x: 274, y: 769, size: 237, opacity: 0.7 },
    { x: 293, y: 246, size: 191, opacity: 0.7 },
    { x: -45, y: -80, size: 234, opacity: 0.7 },
    { x: -67, y: 273, size: 260, opacity: 0.3 },
  ],
  welcome: [
    { x: 222, y: -57, size: 310, opacity: 0.5 },
    { x: -116, y: 591, size: 348, opacity: 0.5 },
    { x: 251, y: 458, size: 204, opacity: 0.5 },
    { x: -16, y: 335, size: 222, opacity: 1 },
    { x: 113, y: 715, size: 237, opacity: 1 },
    { x: 290, y: 351, size: 191, opacity: 1 },
    { x: 67, y: -72, size: 234, opacity: 1 },
    { x: -73, y: 186, size: 260, opacity: 0.5 },
  ],
  login: [
    { x: 272, y: -59, size: 260, opacity: 0.5 },
    { x: -116, y: 591, size: 348, opacity: 0.5 },
    { x: 251, y: 458, size: 204, opacity: 0.5 },
    { x: -16, y: 335, size: 222, opacity: 1 },
    { x: 113, y: 715, size: 237, opacity: 1 },
    { x: 290, y: 351, size: 191, opacity: 1 },
    { x: 141, y: -72, size: 197, opacity: 1 },
    { x: -73, y: 186, size: 260, opacity: 0.5 },
  ],
  forgot: [
    { x: 52, y: -81, size: 260, opacity: 0.5 },
    { x: -116, y: 591, size: 348, opacity: 0.5 },
    { x: 251, y: 458, size: 204, opacity: 0.5 },
    { x: -16, y: 335, size: 222, opacity: 1 },
    { x: 113, y: 715, size: 237, opacity: 1 },
    { x: 290, y: 351, size: 191, opacity: 1 },
    { x: -73, y: 186, size: 260, opacity: 0.5 },
    { x: 10, y: 88, size: 197, opacity: 1 },
    { x: 224, y: -116, size: 197, opacity: 1 },
  ],
  verifyEmail: [{ x: 190, y: -141, size: 197, opacity: 1 }],
  verify: [{ x: 0, y: -121, size: 197, opacity: 1 }],
} as const satisfies Record<string, readonly Bubble[]>;
