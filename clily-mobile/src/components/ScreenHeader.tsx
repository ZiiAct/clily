import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import ChevronIcon from '../assets/icons/chevron.svg';
import ChevronNavyIcon from '../assets/icons/chevron-navy.svg';
import HomeIcon from '../assets/icons/home.svg';
import HomeNavyIcon from '../assets/icons/home-navy.svg';
import { colors, fonts, fontSizes, gradients, layout, radius, shadows } from '../theme/tokens';

type Props = {
  title: string;
  /** navy: default gradient header. light: off-white → mint header with navy text (Figma: Cuaca). */
  variant?: 'navy' | 'light';
  /** Defaults to going back in the navigation stack. */
  onBack?: () => void;
  showBack?: boolean;
  showHome?: boolean;
};

const ROW_HEIGHT = 44;
const ROW_BOTTOM = 17; // keeps the row centered at y≈63 in the 102px Figma header

/** Gradient header with back button, centered title and home button (Figma: KINGDOM / CUACA header). */
export function ScreenHeader({ title, variant = 'navy', onBack, showBack = true, showHome = true }: Props) {
  const insets = useSafeAreaInsets();
  const height = Math.max(layout.headerHeight, insets.top + ROW_HEIGHT + ROW_BOTTOM);
  const light = variant === 'light';
  const Chevron = light ? ChevronNavyIcon : ChevronIcon;
  const Home = light ? HomeNavyIcon : HomeIcon;

  const handleBack = onBack ?? (() => (router.canGoBack() ? router.back() : router.replace('/home')));

  return (
    <View style={[styles.wrapper, light && styles.wrapperLight, { height }]}>
      <LinearGradient
        colors={light ? gradients.headerLight : gradients.header}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      />
      <View style={styles.row}>
        <View style={styles.side}>
          {showBack && (
            <Pressable
              onPress={handleBack}
              accessibilityRole="button"
              accessibilityLabel="Kembali"
              hitSlop={8}
              style={styles.iconButton}
            >
              <View style={styles.chevron}>
                <Chevron width={19.7176} height={12.8678} />
              </View>
            </Pressable>
          )}
        </View>

        <Text style={[styles.title, light && styles.titleLight]} numberOfLines={1}>
          {title}
        </Text>

        <View style={[styles.side, styles.sideRight]}>
          {showHome && (
            <Pressable
              onPress={() => router.navigate('/home')}
              accessibilityRole="button"
              accessibilityLabel="Beranda"
              hitSlop={8}
              style={styles.iconButton}
            >
              <Home width={24} height={22} />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: ROW_BOTTOM,
    borderBottomLeftRadius: radius.header,
    borderBottomRightRadius: radius.header,
    backgroundColor: colors.navy, // keeps the shadow visible on Android
    zIndex: 1,
    ...shadows.header,
  },
  wrapperLight: {
    backgroundColor: colors.onDark,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.mint,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: radius.header,
    borderBottomRightRadius: radius.header,
  },
  row: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  side: {
    width: 60,
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    // The Figma asset points up; it is rotated -90° to point left.
    transform: [{ rotate: '-90deg' }],
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.onDark,
    fontFamily: fonts.bold,
    fontSize: fontSizes.headerTitle,
  },
  titleLight: {
    color: colors.navy,
  },
});
