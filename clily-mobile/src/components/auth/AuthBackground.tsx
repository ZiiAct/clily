import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { SvgProps } from 'react-native-svg';

import PanelLogin from '../../assets/illustrations/auth-panel-login.svg';
import PanelForgot from '../../assets/illustrations/auth-panel-forgot.svg';
import PanelVerifyEmail from '../../assets/illustrations/auth-panel-verify-email.svg';
import PanelVerify from '../../assets/illustrations/auth-panel-verify.svg';
import { BackgroundBubbles, BUBBLES } from '../BackgroundBubbles';
import { gradients } from '../../theme/tokens';
import { useDesignScale } from '../../theme/useDesignScale';

export type AuthBackgroundVariant = 'welcome' | 'login' | 'forgot' | 'verifyEmail' | 'verify';

type PanelSpec = {
  Svg: React.FC<SvgProps>;
  /** SVG box in Figma coordinates, including its shadow padding */
  left: number;
  top: number;
  width: number;
  height: number;
  mirrored: boolean;
};

/** The curved mint panel ("Subtract" in Figma) differs per screen. */
const PANELS: Partial<Record<AuthBackgroundVariant, PanelSpec>> = {
  login: { Svg: PanelLogin, left: -10, top: 136, width: 432, height: 789, mirrored: false },
  forgot: { Svg: PanelForgot, left: -10, top: 136, width: 432, height: 789, mirrored: true },
  verifyEmail: { Svg: PanelVerifyEmail, left: -10, top: -29, width: 432, height: 954, mirrored: true },
  verify: { Svg: PanelVerify, left: -10, top: -12, width: 432, height: 937, mirrored: false },
};

type Props = {
  variant: AuthBackgroundVariant;
};

/** Navy gradient + green bubbles + (optionally) the curved mint panel. */
export function AuthBackground({ variant }: Props) {
  const { x, y } = useDesignScale();
  const panel = PANELS[variant];

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient colors={gradients.authNavy} style={StyleSheet.absoluteFill} />
      <BackgroundBubbles bubbles={BUBBLES[variant]} />
      {panel && (
        <View
          style={{
            position: 'absolute',
            left: x(panel.left),
            top: y(panel.top),
            transform: panel.mirrored ? [{ scaleX: -1 }] : undefined,
          }}
        >
          <panel.Svg width={x(panel.width)} height={y(panel.height)} />
        </View>
      )}
    </View>
  );
}
