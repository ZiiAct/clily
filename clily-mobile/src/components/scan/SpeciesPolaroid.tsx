import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../../theme/tokens';
import type { ImageSource } from '../../types/content.types';

type Props = {
  photo: ImageSource;
  commonName: string;
  scientificName: string;
  /** Extra line under the names, e.g. identification confidence */
  footnote?: string;
};

// Figma "sebaran spesies" / Galeri detail: 372 × 497 card, 319 × 352 photo at (29, 36).
const CARD_W = 372;
const PHOTO_W = 319;
const PHOTO_H = 352;

/** Large photo card used by the scan result and the gallery detail. */
export function SpeciesPolaroid({ photo, commonName, scientificName, footnote }: Props) {
  return (
    <View style={styles.card} accessible accessibilityLabel={`${commonName}, ${scientificName}`}>
      <View style={styles.photoFrame}>
        <Image source={photo} style={styles.photo} resizeMode="cover" />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {commonName}
      </Text>
      <Text style={styles.scientific} numberOfLines={1}>
        ({scientificName})
      </Text>
      {footnote && <Text style={styles.footnote}>{footnote}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: CARD_W,
    minHeight: 497,
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: colors.onDark,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  photoFrame: {
    width: '100%',
    maxWidth: PHOTO_W,
    aspectRatio: PHOTO_W / PHOTO_H,
    backgroundColor: colors.mint,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: 26,
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  scientific: {
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.italic,
    fontSize: 20,
  },
  footnote: {
    marginTop: 6,
    textAlign: 'center',
    color: colors.navyMuted,
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
});
