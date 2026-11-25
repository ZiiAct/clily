import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SpeciesPolaroid } from '../../components/scan/SpeciesPolaroid';
import { useGalleryStore } from '../../store/galleryStore';
import { colors, fonts, gradients, layout } from '../../theme/tokens';

type Props = {
  scanId: string;
  onOpenDistribution: (speciesId: string) => void;
  onOpenSpecies: (speciesId: string) => void;
};

/** Hasil scan (Figma: "sebaran spesies" — the photo card with two buttons). */
export function ScanResultScreen({ scanId, onOpenDistribution, onOpenSpecies }: Props) {
  const insets = useSafeAreaInsets();
  const item = useGalleryStore((s) => s.items.find((i) => i.id === scanId));

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient colors={gradients.heatmapScreen} start={{ x: 0.3, y: 0 }} end={{ x: 0.7, y: 1 }} style={StyleSheet.absoluteFill} />
      <ScreenHeader title="Ensiklopedia" />

      {!item ? (
        <View style={styles.state}>
          <Text style={styles.stateText}>Hasil scan tidak ditemukan.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
          <SpeciesPolaroid
            photo={item.photo}
            commonName={item.commonName}
            scientificName={item.scientificName}
            footnote={item.confidence !== undefined ? `Tingkat keyakinan ${Math.round(item.confidence * 100)}%` : undefined}
          />
          {item.speciesId && (
            <View style={styles.actions}>
              <Button label="Detail sebaran spesies" onPress={() => onOpenDistribution(item.speciesId!)} />
              <Button label="Tentang Spesies Ini" onPress={() => onOpenSpecies(item.speciesId!)} style={styles.second} />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  state: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateText: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  content: {
    paddingTop: 68,
    paddingHorizontal: layout.screenPadding,
  },
  actions: {
    marginTop: 51,
    paddingHorizontal: 21,
  },
  second: {
    marginTop: 12,
  },
});
