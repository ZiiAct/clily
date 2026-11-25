import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { Skeleton, SkeletonGroup } from '../../components/Skeleton';
import { StateMessage, errorMessage } from '../../components/StateMessage';
import { EncyclopediaLayout } from '../../components/encyclopedia/EncyclopediaLayout';
import { SpeciesCard } from '../../components/encyclopedia/TaxonCards';
import { useSpeciesSearch } from '../../hooks/useEncyclopediaQueries';
import { hasActiveFilters, useFilterStore } from '../../store/filterStore';
import { colors, fonts } from '../../theme/tokens';

type Props = {
  initialQuery: string;
};

/** Hasil Ensiklopedia (Figma: HASIL FILTER). Uses the search query and the filters in the store. */
export function SpeciesResultsScreen({ initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const filters = useFilterStore((s) => s.applied);
  const resetFilters = useFilterStore((s) => s.reset);
  const { data, isPending, isError, refetch } = useSpeciesSearch(query, filters);
  const filtered = hasActiveFilters(filters);

  const heading = query
    ? `Hasil pencarian “${query}”${filtered ? ' dengan filter' : ''}`
    : 'Hasil berdasarkan filter yang dipilih';

  return (
    <EncyclopediaLayout
      background="light"
      initialQuery={initialQuery}
      onSearch={setQuery}
      onFiltersApplied={() => undefined /* store update re-runs the query */}
      bottomInset
    >
      <Text style={styles.heading} accessibilityRole="header">
        {heading}
      </Text>

      {!data ? (
        isError && !isPending ? (
          <StateMessage message={errorMessage('Hasil pencarian')} actionLabel="Coba lagi" onAction={() => refetch()} />
        ) : (
          <SkeletonGroup label="Memuat hasil" style={styles.list}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} style={styles.cardSkeleton} />
            ))}
          </SkeletonGroup>
        )
      ) : data.length === 0 ? (
        <StateMessage
          message={query ? `Tidak ada makhluk hidup yang cocok dengan “${query}”.` : 'Tidak ada makhluk hidup yang cocok.'}
          actionLabel={filtered ? 'Hapus semua filter' : undefined}
          onAction={filtered ? resetFilters : undefined}
        />
      ) : (
        <View style={styles.list}>
          {data.map((s) => (
            <SpeciesCard key={s.id} species={s} tone="onLight" onOpen={() => router.push(`/encyclopedia/species/${s.id}`)} />
          ))}
        </View>
      )}
    </EncyclopediaLayout>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  list: {
    marginTop: 17,
    gap: 22,
  },
  cardSkeleton: {
    aspectRatio: 371 / 252,
  },
});
