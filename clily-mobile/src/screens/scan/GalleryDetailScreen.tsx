import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ClockIcon from '../../assets/icons/clock.svg';
import PinIcon from '../../assets/icons/pin.svg';
import CrownIcon from '../../assets/icons/crown.svg';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SpeciesPolaroid } from '../../components/scan/SpeciesPolaroid';
import { useGalleryStore } from '../../store/galleryStore';
import { colors, fonts, gradients, layout } from '../../theme/tokens';
import { formatTakenAt } from '../../utils/formatDate';

const KINGDOM_LABEL = { animalia: 'Animalia', plantae: 'Plantae', fungi: 'Fungi' } as const;

type Props = {
  itemId: string;
  onOpenSpecies: (speciesId: string) => void;
};

/** Detail foto di Galeri Fotomu (Figma: Galeri, third frame). */
export function GalleryDetailScreen({ itemId, onOpenSpecies }: Props) {
  const insets = useSafeAreaInsets();
  const item = useGalleryStore((s) => s.items.find((i) => i.id === itemId));

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient colors={gradients.speciesScreen} style={StyleSheet.absoluteFill} />
      <ScreenHeader title="Galeri Fotomu" />

      {!item ? (
        <View style={styles.state}>
          <Text style={styles.stateText}>Foto tidak ditemukan.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
          {/* The card links to the encyclopedia when the species is known. */}
          <Pressable
            onPress={item.speciesId ? () => onOpenSpecies(item.speciesId!) : undefined}
            disabled={!item.speciesId}
            accessibilityRole={item.speciesId ? 'button' : undefined}
            accessibilityHint={item.speciesId ? 'Buka detail spesies di Ensiklopedia' : undefined}
          >
            <SpeciesPolaroid photo={item.photo} commonName={item.commonName} scientificName={item.scientificName} />
          </Pressable>

          <View style={styles.info}>
            <InfoRow icon={<ClockIcon width={12} height={17} />} text={formatTakenAt(item.takenAt)} label="Waktu" />
            <InfoRow icon={<PinIcon width={17} height={17} />} text={item.location ?? 'Lokasi tidak tersedia'} label="Lokasi" />
            <InfoRow icon={<CrownIcon width={17} height={15} />} text={KINGDOM_LABEL[item.kingdom]} label="Kingdom" />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function InfoRow({ icon, text, label }: { icon: React.ReactNode; text: string; label: string }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${text}`}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.rowText} numberOfLines={1}>
        {text}
      </Text>
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
  info: {
    alignSelf: 'center',
    width: 295,
    marginTop: 26,
    paddingVertical: 10,
    paddingLeft: 40,
    paddingRight: 12,
    gap: 10,
    borderRadius: 15,
    backgroundColor: colors.mint,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 17,
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    marginLeft: 9, // text starts 66px into the box, as in Figma
    color: colors.navy,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
});
