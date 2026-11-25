import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

import { EncyclopediaLayout, type EncyclopediaBackground } from '../../components/encyclopedia/EncyclopediaLayout';
import { ClassCard, FamilyPanel, GenusTile, KingdomCard, SpeciesCard } from '../../components/encyclopedia/TaxonCards';
import { useTaxonPage } from '../../hooks/useEncyclopediaQueries';
import { colors, fonts, layout } from '../../theme/tokens';
import type { Taxon, TaxonRank } from '../../types/species.types';

type Props = {
  /** null = kingdom list (tab root) */
  taxonId: string | null;
};

const RANK_LABEL: Record<TaxonRank, string> = {
  kingdom: 'Kingdom',
  phylum: 'Filum',
  class: 'Kelas',
  order: 'Ordo',
  family: 'Famili',
  genus: 'Genus',
};

const openTaxon = (t: Taxon) => router.push(`/encyclopedia/taxon/${t.id}`);
const openSpecies = (id: string) => router.push(`/encyclopedia/species/${id}`);

/**
 * One screen for every taxonomy level. The layout follows the Figma frame for
 * the level being shown: KINGDOM, KELAS (phylum), FAMILI (order), GENUS grid (family),
 * GENUS list (genus).
 */
export function EncyclopediaScreen({ taxonId }: Props) {
  const { width } = useWindowDimensions();
  const { data, isPending, isError, refetch } = useTaxonPage(taxonId);
  const isRoot = taxonId === null;

  if (!data) {
    return (
      <EncyclopediaLayout background="light" bottomInset={!isRoot}>
        <View style={styles.state}>
          {isPending && <ActivityIndicator color={colors.navy} />}
          {isError && (
            <Text style={styles.stateText} onPress={() => refetch()} accessibilityRole="button">
              Gagal memuat data. Ketuk untuk mencoba lagi.
            </Text>
          )}
        </View>
      </EncyclopediaLayout>
    );
  }

  const { taxon, path, children, species } = data;
  const rank = taxon?.rank;

  let background: EncyclopediaBackground = 'light';
  let title = taxon ? `${RANK_LABEL[taxon.rank]} ${taxon.name}` : 'Kingdom dan Filum';
  let body: React.ReactNode;

  if (!taxon) {
    body = (
      <View style={styles.kingdomList}>
        {children.map((k) => (
          <KingdomCard key={k.id} taxon={k} onPress={() => openTaxon(k)} />
        ))}
      </View>
    );
  } else if (rank === 'genus') {
    background = 'genus';
    body = species.length ? (
      <View style={styles.speciesList}>
        {species.map((s) => (
          <SpeciesCard key={s.id} species={s} tone="onDark" onOpen={() => openSpecies(s.id)} />
        ))}
      </View>
    ) : null;
  } else if (children.length === 0) {
    body = null;
  } else if (rank === 'phylum' || rank === 'class') {
    title = rank === 'phylum' ? 'Kelas dan Ordo' : title;
    body = (
      <View style={styles.classList}>
        {children.map((c, i) => (
          <ClassCard key={c.id} taxon={c} index={i} onPress={() => openTaxon(c)} />
        ))}
      </View>
    );
  } else if (rank === 'order') {
    background = 'dark';
    body = <FamilyPanel families={children} onPress={openTaxon} />;
  } else if (rank === 'family') {
    background = 'dark';
    const tile = (width - layout.screenPadding * 2 - 16) / 2;
    body = (
      <View style={styles.genusGrid}>
        {children.map((g) => (
          <GenusTile key={g.id} taxon={g} size={tile} onPress={() => openTaxon(g)} />
        ))}
      </View>
    );
  } else {
    body = (
      <View style={styles.classList}>
        {children.map((c, i) => (
          <ClassCard key={c.id} taxon={c} index={i} onPress={() => openTaxon(c)} />
        ))}
      </View>
    );
  }

  const empty = body === null;

  return (
    <EncyclopediaLayout
      background={background}
      title={title}
      titleWeight={isRoot ? 'extraBold' : 'bold'}
      path={path}
      bottomInset={!isRoot}
    >
      {empty ? (
        <View style={styles.state}>
          <Text style={[styles.stateText, background !== 'light' && styles.stateOnDark]}>
            Data {taxon ? taxon.name : ''} belum tersedia.
          </Text>
        </View>
      ) : (
        body
      )}
    </EncyclopediaLayout>
  );
}

const styles = StyleSheet.create({
  kingdomList: {
    gap: 20,
  },
  classList: {
    gap: 15,
  },
  genusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 12,
  },
  speciesList: {
    gap: 23,
  },
  state: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  stateText: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
    textAlign: 'center',
  },
  stateOnDark: {
    color: colors.mint,
  },
});
