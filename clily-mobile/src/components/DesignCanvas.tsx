import React from 'react';
import { View } from 'react-native';

import { layout } from '../theme/tokens';
import { useDesignScale } from '../theme/useDesignScale';

type Props = {
  /** Canvas height in Figma pixels (412px-wide frame) */
  height: number;
  children: React.ReactNode;
};

/**
 * Renders children at exact Figma coordinates on a 412px-wide canvas and scales
 * the whole block to the screen width. Used for free-form compositions (Beranda,
 * Cuaca, Heatmap) whose layout can't be expressed as simple rows and columns.
 * Children position themselves absolutely in Figma pixels.
 */
export function DesignCanvas({ height, children }: Props) {
  const { width, sx } = useDesignScale();
  const designWidth = layout.designWidth;

  return (
    <View style={{ width, height: height * sx }}>
      <View
        style={{
          position: 'absolute',
          width: designWidth,
          height,
          // Scale from the canvas center, then shift so the top-left lines up with the screen.
          left: (width - designWidth) / 2,
          top: (height * sx - height) / 2,
          transform: [{ scale: sx }],
        }}
      >
        {children}
      </View>
    </View>
  );
}
