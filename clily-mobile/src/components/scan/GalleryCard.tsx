import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../../theme/tokens';
import type { GalleryItem } from '../../types/scan.types';

type Props = {
  item: GalleryItem;
  width: number;
  onPress: () => void;
};

// Figma Galeri card: 180 × 231, 160px photo at (10, 13), title baseline area at y=190.
const DESIGN_W = 180;
const DESIGN_H = 231;

/** Polaroid-style card in "Galeri Fotomu". */
export function GalleryCard({ item, width, onPress }: Props) {
  const s = width / DESIGN_W;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, buka detail foto`}
      style={({ pressed }) => [styles.card, { width, height: DESIGN_H * s }, pressed && styles.pressed]}
    >
      <View style={[styles.photoFrame, { width: 160 * s, height: 160 * s, marginTop: 13 * s }]}>
        <Image source={item.photo} style={styles.photo} resizeMode="cover" />
      </View>
      <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
        {item.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.onDark,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  pressed: {
    opacity: 0.85,
  },
  photoFrame: {
    backgroundColor: colors.mint,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  title: {
    flex: 1,
    textAlignVertical: 'center',
    paddingHorizontal: 8,
    paddingBottom: 4,
    marginTop: 4,
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
});
