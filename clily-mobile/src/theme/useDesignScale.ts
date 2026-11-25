import { useWindowDimensions } from 'react-native';

import { layout } from './tokens';

/**
 * Converts Figma coordinates (412 × 917 frame) to the current screen.
 * x/size scale with width; y scales with height, so decorative layouts keep
 * their composition on shorter or taller phones.
 */
export function useDesignScale() {
  const { width, height } = useWindowDimensions();
  const sx = width / layout.designWidth;
  const sy = height / layout.designHeight;

  return {
    width,
    height,
    sx,
    sy,
    x: (value: number) => value * sx,
    y: (value: number) => value * sy,
  };
}
