import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import WeatherSmall from '../../assets/icons/weather-small.svg';
import ProfileHead from '../../assets/icons/nav-profile-head.svg';
import { colors, fonts, gradients, radius, shadows } from '../../theme/tokens';
import type { User } from '../../types/user.types';

type Props = {
  user: User | null;
  onPressProfile: () => void;
  onPressWeather: () => void;
};

const AVATAR = 58;
const TOP = 46; // Figma: avatar/name row starts 46px from the top of the 129px header

/** Beranda header: avatar, name, contributor title, XP bar and weather shortcut (Figma: HOME SCROLL top). */
export function HomeHeader({ user, onPressProfile, onPressWeather }: Props) {
  const insets = useSafeAreaInsets();
  const xp = user?.xp ?? 0;
  const xpTotal = xp + (user?.xpToNext ?? 0);
  const progress = xpTotal > 0 ? Math.min(xp / xpTotal, 1) : 0;

  return (
    <View style={[styles.header, { paddingTop: Math.max(TOP, insets.top + 8) }]}>
      <LinearGradient colors={gradients.header} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.gradient} />

      <Pressable
        onPress={onPressProfile}
        accessibilityRole="button"
        accessibilityLabel="Buka profil"
        style={styles.avatar}
      >
        {user?.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} resizeMode="cover" />
        ) : (
          <View style={styles.avatarFallback}>
            <ProfileHead width={22} height={22} />
          </View>
        )}
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1} onPress={onPressProfile}>
          {user?.username ?? 'Tamu'}
        </Text>
        <Text style={styles.title}>{user?.title ?? 'Kontributor'}</Text>
        <View
          style={styles.xpRow}
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Poin pengalaman"
          accessibilityValue={{ min: 0, max: xpTotal, now: xp, text: `${xp} dari ${xpTotal} XP` }}
        >
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress * 100}%` }]} />
            <View style={[styles.knob, { left: `${progress * 100}%` }]}>
              <View style={styles.knobDot} />
            </View>
          </View>
          <Text style={styles.xpLabel}>
            {xp} / {xpTotal} XP
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onPressWeather}
        accessibilityRole="button"
        accessibilityLabel="Lihat cuaca"
        hitSlop={12}
        style={[styles.weather, { top: Math.max(TOP, insets.top + 8) }]}
      >
        <WeatherSmall width={32.6428} height={19.25} />
      </Pressable>
    </View>
  );
}

const KNOB = 11;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingLeft: 28,
    paddingRight: 27,
    paddingBottom: 25,
    borderBottomLeftRadius: radius.header,
    borderBottomRightRadius: radius.header,
    backgroundColor: colors.navy,
    zIndex: 1,
    ...shadows.header,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: radius.header,
    borderBottomRightRadius: radius.header,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    flex: 1,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 14,
    paddingTop: 7,
  },
  name: {
    paddingRight: 44, // leave room for the weather icon
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  title: {
    marginTop: 3,
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  xpRow: {
    marginTop: 3,
    height: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    flex: 1,
    height: 5,
    borderRadius: 28,
    backgroundColor: colors.white,
  },
  fill: {
    height: 5,
    borderRadius: 28,
    backgroundColor: colors.green,
  },
  knob: {
    position: 'absolute',
    top: (5 - KNOB) / 2,
    width: KNOB,
    height: KNOB,
    marginLeft: -KNOB + 1, // sits at the end of the green fill, as in Figma
    borderRadius: KNOB / 2,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  knobDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.white,
  },
  xpLabel: {
    marginLeft: 13,
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 10,
  },
  weather: {
    position: 'absolute',
    right: 27,
  },
});
