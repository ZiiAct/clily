import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, type TransformsStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { SvgProps } from 'react-native-svg';

import Animalia from '../../assets/taxonomy/kingdom-animalia.svg';
import Plantae from '../../assets/taxonomy/kingdom-plantae.svg';
import Fungi from '../../assets/taxonomy/kingdom-fungi.svg';
import Protista from '../../assets/taxonomy/kingdom-protista.svg';
import Monera from '../../assets/taxonomy/kingdom-monera.svg';
import Insecta from '../../assets/taxonomy/class-insecta.svg';
import Crustacea from '../../assets/taxonomy/class-crustacea.svg';
import Myriapoda from '../../assets/taxonomy/class-myriapoda.svg';
import Arachnida from '../../assets/taxonomy/class-arachnida.svg';
import ButterflyNavy from '../../assets/taxonomy/butterfly-navy.svg';
import ButterflyGreen from '../../assets/taxonomy/butterfly-green.svg';
import BookButton from '../../assets/icons/book-button.svg';
import { colors, fonts, gradients, shadows } from '../../theme/tokens';
import type { Species, Taxon } from '../../types/species.types';

type SvgComponent = React.FC<SvgProps>;

/**
 * A silhouette placed like Figma: a bounding box at (x, y), with the SVG centered
 * inside it and optionally transformed (rotation / flip).
 */
type Art = {
  Svg: SvgComponent;
  svgW: number;
  svgH: number;
  x: number;
  y: number;
  boxW: number;
  boxH: number;
  transform?: NonNullable<TransformsStyle['transform']>;
};

function Silhouette({ art }: { art: Art }) {
  return (
    <View
      pointerEvents="none"
      style={{ position: 'absolute', left: art.x, top: art.y, width: art.boxW, height: art.boxH, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={{ transform: art.transform }}>
        <art.Svg width={art.svgW} height={art.svgH} />
      </View>
    </View>
  );
}

// ---------- Kingdom cards (Figma: "<Kingdom> button", 372 × 132) ----------

type CardSide = 'left' | 'right';

const KINGDOM_ART: Record<string, { art: Art; labelSide: CardSide }> = {
  animalia: { labelSide: 'right', art: { Svg: Animalia, svgW: 129, svgH: 152, x: 0, y: -10, boxW: 129, boxH: 152 } },
  plantae: { labelSide: 'left', art: { Svg: Plantae, svgW: 183.9, svgH: 154.001, x: 204, y: -11, boxW: 183.9, boxH: 154 } },
  fungi: {
    labelSide: 'right',
    art: { Svg: Fungi, svgW: 146, svgH: 137.301, x: 0, y: 0.35, boxW: 146, boxH: 137.3, transform: [{ scaleX: -1 }] },
  },
  protista: {
    labelSide: 'left',
    art: { Svg: Protista, svgW: 193.227, svgH: 143.159, x: 207, y: -25.36, boxW: 220.335, boxH: 182.724, transform: [{ rotate: '-12.91deg' }] },
  },
  monera: { labelSide: 'right', art: { Svg: Monera, svgW: 132.565, svgH: 158.913, x: 5.43, y: -13.46, boxW: 132.565, boxH: 158.913 } },
};

export function KingdomCard({ taxon, onPress }: { taxon: Taxon; onPress: () => void }) {
  const config = KINGDOM_ART[taxon.id];
  const labelSide = config?.labelSide ?? 'right';
  // Teal sits on the label side, mint fades toward the silhouette.
  const colorsLR = labelSide === 'right' ? [colors.mint, colors.green, colors.teal] : [colors.teal, colors.green, colors.mint];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Kingdom ${taxon.name}`}
      style={({ pressed }) => [styles.kingdomCard, pressed && styles.pressed]}
    >
      <View style={styles.clip}>
        <LinearGradient colors={colorsLR as [string, string, string]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={StyleSheet.absoluteFill} />
        {config && <Silhouette art={config.art} />}
        <Text style={[styles.kingdomLabel, labelSide === 'right' ? styles.labelRight : styles.labelLeft]}>{taxon.name}</Text>
      </View>
    </Pressable>
  );
}

// ---------- Class cards (Figma: "kelas <name>", 372 × 75) ----------

const CLASS_ART: Record<string, { art: Art; labelSide: CardSide }> = {
  insecta: {
    labelSide: 'right',
    art: { Svg: Insecta, svgW: 70, svgH: 80.0257, x: 7, y: -9, boxW: 85.3, boxH: 92.96, transform: [{ rotate: '12.15deg' }] },
  },
  crustacea: { labelSide: 'left', art: { Svg: Crustacea, svgW: 107, svgH: 83, x: 248, y: -8, boxW: 107, boxH: 83 } },
  myriapoda: {
    labelSide: 'right',
    art: { Svg: Myriapoda, svgW: 112, svgH: 112, x: -12, y: -36, boxW: 135.8, boxH: 135.8, transform: [{ rotate: '-14deg' }] },
  },
  arachnida: {
    labelSide: 'left',
    art: { Svg: Arachnida, svgW: 81.6885, svgH: 87.6877, x: 265, y: -12, boxW: 93, boxH: 98.15, transform: [{ rotate: '-7.96deg' }] },
  },
};

export function ClassCard({ taxon, index, onPress }: { taxon: Taxon; index: number; onPress: () => void }) {
  const config = CLASS_ART[taxon.id];
  const labelSide = config?.labelSide ?? (index % 2 === 0 ? 'right' : 'left');
  // Navy sits under the label; green-teal under the silhouette.
  const colorsLR = labelSide === 'right' ? gradients.classCard : [...gradients.classCard].reverse();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Kelas ${taxon.name}`}
      style={({ pressed }) => [styles.classCard, pressed && styles.pressed]}
    >
      <View style={styles.clip}>
        <LinearGradient colors={colorsLR as unknown as [string, string]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={StyleSheet.absoluteFill} />
        {config && <Silhouette art={config.art} />}
        <Text style={[styles.classLabel, labelSide === 'right' ? styles.classLabelRight : styles.classLabelLeft]}>{taxon.name}</Text>
      </View>
    </Pressable>
  );
}

// ---------- Family panel (Figma: FAMILI "Ordo Lepidoptera") ----------

export function FamilyPanel({ families, onPress }: { families: Taxon[]; onPress: (taxon: Taxon) => void }) {
  const groups = families.reduce<{ name: string; items: Taxon[] }[]>((acc, family) => {
    const name = family.group ?? 'Lainnya';
    const existing = acc.find((g) => g.name === name);
    if (existing) existing.items.push(family);
    else acc.push({ name, items: [family] });
    return acc;
  }, []);

  return (
    <View style={styles.familyPanel}>
      <LinearGradient colors={gradients.familyPanel} style={StyleSheet.absoluteFill} />
      <Silhouette art={{ Svg: ButterflyNavy, svgW: 118.215, svgH: 101.238, x: 265.5, y: -24.66, boxW: 148.9, boxH: 138.3, transform: [{ rotate: '-22.45deg' }] }} />
      <View style={styles.familyBottomArt}>
        <Silhouette art={{ Svg: ButterflyGreen, svgW: 152.395, svgH: 130.291, x: -37, y: 0, boxW: 186.75, boxH: 171.2, transform: [{ rotate: '18.31deg' }] }} />
      </View>

      {groups.map((group, gi) => (
        <View key={group.name} style={gi > 0 && styles.familyGroupGap}>
          <Text accessibilityRole="header" style={styles.familyGroupTitle}>
            Famili Kelompok{'\n'}
            {group.name}
          </Text>
          {group.items.map((family, i) => (
            <Pressable
              key={family.id}
              onPress={() => onPress(family)}
              accessibilityRole="button"
              accessibilityLabel={`Famili ${family.name}`}
              style={({ pressed }) => [styles.familyPill, pressed && styles.pressed]}
            >
              <LinearGradient
                colors={(i % 2 === 0 ? gradients.familyPill : [...gradients.familyPill].reverse()) as unknown as [string, string]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[StyleSheet.absoluteFill, styles.familyPillFill]}
              />
              <Text style={styles.familyPillLabel}>{family.name}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

// ---------- Genus tiles (Figma: FAMILI → GENUS grid, 178 × 178) ----------

export function GenusTile({ taxon, size, onPress }: { taxon: Taxon; size: number; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Genus ${taxon.name}`}
      style={({ pressed }) => [styles.genusTile, { width: size, height: size }, pressed && styles.pressed]}
    >
      <LinearGradient colors={gradients.familyPanel} style={StyleSheet.absoluteFill} />
      {taxon.image && <Image source={taxon.image} style={StyleSheet.absoluteFill} resizeMode="cover" />}
      <LinearGradient
        colors={gradients.photoNavyOverlay}
        locations={[0, 0.43, 0.97]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.genusLabel}>
        Genus{'\n'}
        {taxon.name}
      </Text>
    </Pressable>
  );
}

// ---------- Species cards (Figma: GENUS list and HASIL FILTER, 371 × 252) ----------

type SpeciesCardProps = {
  species: Species;
  /** mint border on dark backgrounds (Genus), navy border + shadow on mint (Hasil Filter) */
  tone: 'onDark' | 'onLight';
  onOpen: () => void;
};

export function SpeciesCard({ species, tone, onOpen }: SpeciesCardProps) {
  return (
    <Pressable
      onPress={onOpen}
      accessibilityRole="button"
      accessibilityLabel={`${species.scientificName}, buka detail`}
      style={({ pressed }) => [styles.speciesCard, tone === 'onLight' ? styles.speciesOnLight : styles.speciesOnDark, pressed && styles.pressed]}
    >
      <View style={styles.speciesClip}>
        <Image source={species.photo} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <LinearGradient
          colors={gradients.photoNavyOverlay}
          locations={[0, 0.53, 1]}
          start={{ x: 0.85, y: 0 }}
          end={{ x: 0.15, y: 1.15 }}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.speciesName} numberOfLines={1}>
          {species.scientificName}
        </Text>
        <View style={styles.bookButton} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <View style={styles.bookArt}>
            <BookButton width={62} height={62} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
  },
  clip: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  labelRight: {
    right: 30,
    textAlign: 'right',
  },
  labelLeft: {
    left: 26,
  },
  kingdomCard: {
    height: 132,
    borderRadius: 15,
    backgroundColor: colors.green,
    ...shadows.card,
  },
  kingdomLabel: {
    position: 'absolute',
    top: 53.5,
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  classCard: {
    height: 75,
    borderRadius: 15,
    backgroundColor: colors.blue,
    ...shadows.card,
  },
  classLabelRight: {
    right: 21,
    textAlign: 'right',
  },
  classLabelLeft: {
    left: 21,
  },
  classLabel: {
    position: 'absolute',
    top: 25,
    color: 'rgba(248, 248, 248, 0.97)',
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  familyPanel: {
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 17,
    paddingTop: 21,
    paddingBottom: 35,
  },
  familyBottomArt: {
    position: 'absolute',
    left: 0,
    bottom: 10,
    width: 190,
    height: 171,
  },
  familyGroupGap: {
    marginTop: 19,
  },
  familyGroupTitle: {
    alignSelf: 'center',
    width: 220,
    marginBottom: 19,
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  familyPill: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  familyPillFill: {
    borderRadius: 15,
  },
  familyPillLabel: {
    color: colors.mint,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  genusTile: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.mint,
    overflow: 'hidden',
  },
  genusLabel: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    color: colors.onDark,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  speciesCard: {
    aspectRatio: 371 / 252,
    borderRadius: 15,
    borderWidth: 1,
  },
  speciesOnDark: {
    borderColor: colors.mint,
  },
  speciesOnLight: {
    borderColor: colors.navy,
    backgroundColor: colors.navy,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  speciesClip: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  speciesName: {
    position: 'absolute',
    left: 25,
    right: 80,
    bottom: 23,
    color: colors.onDark,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  bookButton: {
    position: 'absolute',
    right: 19,
    bottom: 22,
    width: 54,
    height: 54,
  },
  bookArt: {
    position: 'absolute',
    left: -3,
    top: -3,
  },
});
