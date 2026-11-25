import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { ScreenHeader } from '../../components/ScreenHeader';
import { PhotoCarousel } from '../../components/encyclopedia/PhotoCarousel';
import { IUCN_COLOR, TREND_COLOR } from '../../components/encyclopedia/statusColors';
import { useSpeciesDetail } from '../../hooks/useEncyclopediaQueries';
import { colors, fonts, gradients, shadows } from '../../theme/tokens';

type Props = {
  speciesId: string;
  onOpenDistribution: () => void;
};

/** Detail spesies (Figma: DANAUS PLEXIPPUS). */
export function SpeciesDetailScreen({ speciesId, onOpenDistribution }: Props) {
  const insets = useSafeAreaInsets();
  const { data: species, isPending, isError, refetch } = useSpeciesDetail(speciesId);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient colors={gradients.speciesScreen} style={StyleSheet.absoluteFill} />
      <ScreenHeader title="Ensiklopedia" />

      {!species ? (
        <View style={styles.state}>
          {isPending && <ActivityIndicator color={colors.navy} />}
          {isError && (
            <Text style={styles.stateText} onPress={() => refetch()} accessibilityRole="button">
              Data spesies tidak dapat dimuat. Ketuk untuk mencoba lagi.
            </Text>
          )}
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 44 }} showsVerticalScrollIndicator={false}>
          <View style={styles.titleBlock}>
            <Text accessibilityRole="header" style={styles.title}>
              {species.scientificName}
            </Text>
            <Text style={styles.subtitle}>({species.englishName})</Text>
          </View>

          <PhotoCarousel photos={species.gallery} label={species.scientificName} />

          <View style={styles.panel}>
            <LinearGradient
              colors={gradients.speciesPanel}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0.15 }}
              style={[StyleSheet.absoluteFill, styles.panelFill]}
            />

            <View style={styles.taxonomyBox}>
              <Text style={styles.boxTitle}>Tingkat Taksonomi</Text>
              {species.taxonomy.map(([label, value]) => (
                <View key={label} style={styles.taxonomyRow} accessible accessibilityLabel={`${label}: ${value}`}>
                  <Text style={styles.taxonomyLabel}>{label}</Text>
                  <Text style={styles.taxonomyColon}>:</Text>
                  <Text style={styles.taxonomyValue}>{value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.statRow}>
              <Stat label="Keadaan" value={species.iucnStatus} color={IUCN_COLOR[species.iucnStatus]} />
              <Stat label="Populasi" value={species.populationTrend} color={TREND_COLOR[species.populationTrend]} />
            </View>

            <View style={styles.descriptionBox}>
              <Text style={styles.description}>
                <Text style={styles.descriptionLead}>{species.commonName}</Text> {species.description}
              </Text>
            </View>
          </View>

          <Button label="Detail sebaran spesies" onPress={onOpenDistribution} style={styles.cta} />
        </ScrollView>
      )}
    </View>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.stat} accessible accessibilityLabel={`${label}: ${value}`}>
      <LinearGradient
        colors={gradients.statBox}
        locations={[0, 0.58, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[StyleSheet.absoluteFill, styles.statFill]}
      />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
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
    padding: 24,
  },
  stateText: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
    textAlign: 'center',
  },
  titleBlock: {
    marginTop: 16,
    alignItems: 'center',
  },
  title: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 24,
  },
  subtitle: {
    color: colors.navy,
    fontFamily: fonts.italic,
    fontSize: 24,
  },
  panel: {
    marginHorizontal: 20,
    paddingTop: 19,
    paddingBottom: 22,
    paddingHorizontal: 30,
  },
  panelFill: {
    borderRadius: 15,
  },
  taxonomyBox: {
    borderRadius: 15,
    backgroundColor: colors.onDark,
    paddingTop: 12,
    paddingBottom: 16,
    paddingLeft: 31,
    paddingRight: 12,
  },
  boxTitle: {
    marginBottom: 12,
    marginLeft: -19, // centered on the box, not the indented rows
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 20,
  },
  taxonomyRow: {
    flexDirection: 'row',
  },
  taxonomyLabel: {
    width: 98,
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  taxonomyColon: {
    width: 25,
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  taxonomyValue: {
    flex: 1,
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  statRow: {
    marginTop: 10,
    marginHorizontal: -2, // two 153px boxes + 10px gap are 4px wider than the taxonomy box

    flexDirection: 'row',
    gap: 10,
  },
  stat: {
    flex: 1,
    height: 57,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  statFill: {
    borderRadius: 15,
  },
  statLabel: {
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  statValue: {
    marginTop: 1,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  descriptionBox: {
    marginTop: 11,
    marginHorizontal: -1,
    borderRadius: 15,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  description: {
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'justify',
  },
  descriptionLead: {
    fontFamily: fonts.bold,
  },
  cta: {
    marginTop: 18,
    marginHorizontal: 41,
    ...shadows.card,
  },
});
