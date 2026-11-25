import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

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
        <View style={styles.state}>
          {isPending && <ActivityIndicator color={colors.navy} />}
          {isError && (
            <Text style={styles.stateText} onPress={() => refetch()} accessibilityRole="button">
              Gagal memuat hasil. Ketuk untuk mencoba lagi.
            </Text>
          )}
        </View>
      ) : data.length === 0 ? (
        <View style={styles.state}>
          <Text style={styles.stateText}>Tidak ada makhluk hidup yang cocok.</Text>
          {filtered && (
            <Text style={styles.link} onPress={resetFilters} accessibilityRole="button">
              Hapus semua filter
            </Text>
          )}
        </View>
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
  state: {
    paddingVertical: 60,
    alignItems: 'center',
    gap: 12,
  },
  stateText: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
    textAlign: 'center',
  },
  link: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
