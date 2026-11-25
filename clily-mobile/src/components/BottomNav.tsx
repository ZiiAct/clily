import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';

import EncyclopediaIcon from '../assets/icons/nav-encyclopedia.svg';
import EncyclopediaActiveIcon from '../assets/icons/nav-encyclopedia-active.svg';
import TriviaBulb from '../assets/icons/nav-trivia-bulb.svg';
import TriviaShine from '../assets/icons/nav-trivia-shine.svg';
import TriviaBase from '../assets/icons/nav-trivia-base.svg';
import TriviaActiveIcon from '../assets/icons/nav-trivia-active.svg';
import ArticlesIcon from '../assets/icons/nav-articles.svg';
import ArticlesActiveIcon from '../assets/icons/nav-articles-active.svg';
import ProfileHead from '../assets/icons/nav-profile-head.svg';
import ProfileActiveIcon from '../assets/icons/nav-profile-active.svg';
import CameraIcon from '../assets/icons/nav-camera.svg';
import { colors, fonts, fontSizes, layout, radius, shadows } from '../theme/tokens';

/**
 * Bottom navigation (Figma: "NAVBAR FIKS BANGETTT").
 * Inactive tab: navy icon + label. Active tab: green icon, tilted, no label.
 * The raised green camera button in the middle opens /camera.
 */

type TabName = 'encyclopedia' | 'trivia' | 'articles' | 'profile';

const ICON_TOP = 12;
const LABEL_TOP = 48;
const ACTIVE_CENTER_Y = 36;

function TriviaIcon() {
  // The Figma icon is three layers: bulb, white shine, and base.
  return (
    <View style={{ width: 22, height: 33 }}>
      <TriviaBulb width={22} height={25.7061} style={styles.abs} />
      <TriviaShine width={6.1389} height={6.20493} style={[styles.abs, { left: 12.27, top: 3.55 }]} />
      <TriviaBase width={7.05526} height={6.40743} style={[styles.abs, { left: 7.45, top: 26.6 }]} />
    </View>
  );
}

function ProfileIcon() {
  return (
    <View style={{ width: 32, height: 32.9, alignItems: 'center' }}>
      <ProfileHead width={15.5429} height={15.5429} />
      <View style={styles.profileBody} />
    </View>
  );
}

type TabConfig = {
  label: string;
  Icon: React.FC;
  ActiveIcon: React.FC;
  /** Size of the active icon box before rotation */
  activeSize: { width: number; height: number };
  activeRotation: string;
};

const TABS: Record<TabName, TabConfig> = {
  encyclopedia: {
    label: 'Ensiklopedia',
    Icon: () => <EncyclopediaIcon width={27.834} height={33.4004} />,
    ActiveIcon: () => <EncyclopediaActiveIcon width={31.1748} height={37.4102} />,
    activeSize: { width: 31.1748, height: 37.4102 },
    activeRotation: '-25.86deg',
  },
  trivia: {
    label: 'Trivia',
    Icon: TriviaIcon,
    ActiveIcon: () => <TriviaActiveIcon width={26.175} height={39.2625} />,
    activeSize: { width: 26.175, height: 39.2625 },
    activeRotation: '-25.9deg',
  },
  articles: {
    label: 'Artikel',
    Icon: () => <ArticlesIcon width={27} height={33.0967} />,
    ActiveIcon: () => <ArticlesActiveIcon width={30.7988} height={37.7539} />,
    activeSize: { width: 30.7988, height: 37.7539 },
    activeRotation: '-21.84deg',
  },
  profile: {
    label: 'Profil',
    Icon: ProfileIcon,
    ActiveIcon: () => <ProfileActiveIcon width={36.7174} height={37.7664} />,
    activeSize: { width: 36.7174, height: 37.7664 },
    activeRotation: '-21.01deg',
  },
};

const LEFT_TABS: TabName[] = ['encyclopedia', 'trivia'];
const RIGHT_TABS: TabName[] = ['articles', 'profile'];

type TabItemProps = {
  name: TabName;
  active: boolean;
  onPress: () => void;
};

function TabItem({ name, active, onPress }: TabItemProps) {
  const { label, Icon, ActiveIcon, activeSize, activeRotation } = TABS[name];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
      style={styles.tab}
    >
      {active ? (
        <View
          style={[
            styles.activeIcon,
            {
              width: activeSize.width,
              height: activeSize.height,
              top: ACTIVE_CENTER_Y - activeSize.height / 2,
              transform: [{ rotate: activeRotation }],
            },
          ]}
        >
          <ActiveIcon />
        </View>
      ) : (
        <>
          <View style={styles.icon}>
            <Icon />
          </View>
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

type BottomNavProps = Partial<Pick<BottomTabBarProps, 'navigation'>> &
  Pick<BottomTabBarProps, 'state'>;

export function BottomNav({ state, navigation }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index]?.name;

  const goTo = (name: TabName) => {
    const route = state.routes.find((r: (typeof state.routes)[number]) => r.name === name);
    if (!route) return;

    const event = navigation?.emit?.({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (activeRoute !== name && !event?.defaultPrevented) {
      if (typeof navigation?.navigate === 'function') {
        navigation.navigate(name);
      } else {
        router.navigate(route.name as never);
      }
    }
  };

  const renderTab = (name: TabName) => (
    <TabItem key={name} name={name} active={activeRoute === name} onPress={() => goTo(name)} />
  );

  return (
    <View style={[styles.bar, { height: layout.bottomNavHeight + insets.bottom, paddingBottom: insets.bottom }]}>
      {LEFT_TABS.map(renderTab)}

      <View style={styles.tab}>
        <Pressable
          onPress={() => router.push('/camera')}
          accessibilityRole="button"
          accessibilityLabel="Buka kamera untuk scan"
          style={({ pressed }) => [styles.cameraButton, pressed && styles.cameraPressed]}
        >
          <CameraIcon width={45.4844} height={45.4844} />
        </Pressable>
      </View>

      {RIGHT_TABS.map(renderTab)}
    </View>
  );
}

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  bar: {
    flexDirection: 'row',
    paddingHorizontal: 15, // centers the 5 columns where Figma places them on a 412px frame
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
  },
  tab: {
    flex: 1,
    height: layout.bottomNavHeight,
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: ICON_TOP,
  },
  activeIcon: {
    position: 'absolute',
  },
  label: {
    position: 'absolute',
    top: LABEL_TOP,
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
  },
  profileBody: {
    marginTop: 1.83, // body starts at y=29.37 in Figma, head ends at 27.54
    width: 32,
    height: 15.543,
    backgroundColor: colors.navy,
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
  },
  cameraButton: {
    position: 'absolute',
    top: -26,
    width: 71,
    height: 71,
    borderRadius: radius.cameraButton,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.cameraButton,
  },
  cameraPressed: {
    opacity: 0.85,
  },
});