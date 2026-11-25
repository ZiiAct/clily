import React, { useMemo, useRef, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
  useWindowDimensions,
} from 'react-native';

import Chevron from '../../assets/icons/carousel-chevron.svg';
import { colors } from '../../theme/tokens';
import type { ImageSource } from '../../types/content.types';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = {
  photos: ImageSource[];
  /** Used in accessibility labels, e.g. the species name */
  label: string;
};

// Figma "DANAUS PLEXIPPUSZ" component: 342px tall, 312px main photo, 221px side photos.
const HEIGHT = 342;
const MAIN = 312;
const SIDE = 221;
const GAP = 20;
const SWIPE = 40;

/** Species photo carousel: main photo with the previous/next photos peeking at the screen edges. */
export function PhotoCarousel({ photos, label }: Props) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const count = photos.length;
  const multiple = count > 1;

  const go = (delta: number) => {
    if (!multiple) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIndex((i) => (i + delta + count) % count);
  };
  const goRef = useRef(go);
  goRef.current = go;

  const pan = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 12 && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderRelease: (_, g) => {
          if (g.dx < -SWIPE) goRef.current(1);
          else if (g.dx > SWIPE) goRef.current(-1);
        },
      }),
    [],
  );

  // Keep ~50px on each side for the arrows and peeks (Figma: 312px photo on a 412px screen).
  const main = Math.min(MAIN, width - 100);
  const mainLeft = (width - main) / 2;
  const mainTop = 12 + (MAIN - main) / 2;
  const prev = photos[(index - 1 + count) % count];
  const next = photos[(index + 1) % count];

  return (
    <View
      style={styles.container}
      {...pan.panHandlers}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={`Foto ${label}, ${index + 1} dari ${count}`}
      accessibilityActions={multiple ? [{ name: 'increment' }, { name: 'decrement' }] : []}
      onAccessibilityAction={(e) => go(e.nativeEvent.actionName === 'increment' ? 1 : -1)}
    >
      {multiple && (
        <>
          <View style={[styles.side, { left: mainLeft - GAP - SIDE }]}>
            <Image source={prev} style={styles.photo} resizeMode="cover" />
          </View>
          <View style={[styles.side, { left: mainLeft + main + GAP }]}>
            <Image source={next} style={styles.photo} resizeMode="cover" />
          </View>
        </>
      )}

      <View style={[styles.main, { left: mainLeft, top: mainTop, width: main, height: main }]}>
        <Image key={index} source={photos[index]} style={styles.photo} resizeMode="cover" />
      </View>

      {multiple && (
        <>
          <Pressable
            onPress={() => go(-1)}
            accessibilityRole="button"
            accessibilityLabel="Foto sebelumnya"
            hitSlop={14}
            style={[styles.arrow, { left: mainLeft - 26 }]}
          >
            <Chevron width={17.8076} height={29.6999} />
          </Pressable>
          <Pressable
            onPress={() => go(1)}
            accessibilityRole="button"
            accessibilityLabel="Foto berikutnya"
            hitSlop={14}
            style={[styles.arrow, styles.arrowRight, { left: mainLeft + main + 9 }]}
          >
            <Chevron width={17.8076} height={29.6999} />
          </Pressable>
        </>
      )}
    </View>
  );
}

const shadow = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 2.5,
  elevation: 4,
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: '100%',
  },
  main: {
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: colors.mint,
    ...shadow,
  },
  side: {
    position: 'absolute',
    top: (HEIGHT - SIDE) / 2,
    width: SIDE,
    height: SIDE,
    borderRadius: 15,
    backgroundColor: colors.mint,
    ...shadow,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  arrow: {
    position: 'absolute',
    top: 152,
    width: 18,
    height: 30,
  },
  arrowRight: {
    transform: [{ rotate: '180deg' }],
  },
});
