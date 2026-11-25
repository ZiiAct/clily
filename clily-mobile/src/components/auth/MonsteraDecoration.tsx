import React from 'react';
import { View, type TransformsStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import MonsteraLogin from '../../assets/illustrations/monstera-login.svg';
import MonsteraRegister from '../../assets/illustrations/monstera-register.svg';
import { useDesignScale } from '../../theme/useDesignScale';

type Spec = {
  Svg: React.FC<SvgProps>;
  /** Rotated bounding box in Figma frame coordinates */
  left: number;
  top: number;
  boxWidth: number;
  boxHeight: number;
  transform: NonNullable<TransformsStyle['transform']>;
};

// Inner leaf group is 245.787 × 205.825; the SVG adds a shadow margin (-10, -8).
const LEAF = { width: 245.787, height: 205.825 };
const SVG = { width: 265.787, height: 225.825, offsetX: -10, offsetY: -8 };

const SPECS: Record<'login' | 'register', Spec> = {
  login: {
    Svg: MonsteraLogin,
    left: -21,
    top: 68,
    boxWidth: 267.935,
    boxHeight: 232.861,
    transform: [{ rotate: '-6.64deg' }],
  },
  register: {
    Svg: MonsteraRegister,
    left: 166,
    top: -71,
    boxWidth: 296.454,
    boxHeight: 270.42,
    transform: [{ rotate: '-162.43deg' }, { scaleY: -1 }],
  },
};

/** Monstera leaves in the corner of Login and Register (Figma: "Group 64" / "Group 65"). */
export function MonsteraDecoration({ variant }: { variant: 'login' | 'register' }) {
  const { x, y, sx } = useDesignScale();
  const spec = SPECS[variant];

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: x(spec.left),
        top: y(spec.top),
        width: spec.boxWidth * sx,
        height: spec.boxHeight * sx,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: LEAF.width * sx, height: LEAF.height * sx, transform: spec.transform }}>
        <View style={{ position: 'absolute', left: SVG.offsetX * sx, top: SVG.offsetY * sx }}>
          <spec.Svg width={SVG.width * sx} height={SVG.height * sx} />
        </View>
      </View>
    </View>
  );
}
