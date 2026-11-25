import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ScreenHeader } from '../ScreenHeader';
import { SearchBar } from '../SearchBar';
import { FilterChip } from '../FilterChip';
import { Breadcrumb } from './Breadcrumb';
import { FilterSheet } from './FilterSheet';
import { hasActiveFilters, useFilterStore } from '../../store/filterStore';
import { colors, fonts, gradients, layout } from '../../theme/tokens';
import type { Taxon } from '../../types/species.types';

export type EncyclopediaBackground = 'light' | 'dark' | 'genus';

type Props = {
  background: EncyclopediaBackground;
  title?: string;
  /** Kingdom screen uses ExtraBold; deeper levels use Bold (as in Figma) */
  titleWeight?: 'bold' | 'extraBold';
  path?: Taxon[];
  initialQuery?: string;
  /** Called after "Terapkan Filter"; defaults to opening the results screen */
  onFiltersApplied?: () => void;
  /** Called on search submit; defaults to opening the results screen */
  onSearch?: (query: string) => void;
  /** Extra space under the content (stack screens have no bottom nav) */
  bottomInset?: boolean;
  children: React.ReactNode;
};

const openResults = (q: string) => router.push({ pathname: '/encyclopedia/results', params: q ? { q } : {} });

/** Header + search + filter chip + breadcrumb shared by every Ensiklopedia screen. */
export function EncyclopediaLayout({
  background,
  title,
  titleWeight = 'bold',
  path,
  initialQuery = '',
  onFiltersApplied,
  onSearch,
  bottomInset,
  children,
}: Props) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState(initialQuery);
  const [sheetOpen, setSheetOpen] = useState(false);
  const startEditing = useFilterStore((s) => s.startEditing);
  const filtersActive = useFilterStore((s) => hasActiveFilters(s.applied));
  const dark = background !== 'light';

  const submitSearch = () => (onSearch ?? openResults)(query.trim());

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {background !== 'light' && (
        <LinearGradient
          colors={background === 'dark' ? gradients.taxonDark : gradients.taxonGenus}
          // Figma angles: 23.5° (mostly bottom → top) for dark, 61.5° (bottom-left → top-right) for genus
          start={background === 'dark' ? { x: 0.3, y: 1 } : { x: 0, y: 0.75 }}
          end={background === 'dark' ? { x: 0.7, y: 0 } : { x: 1, y: 0.25 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <ScreenHeader title="Ensiklopedia" />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset ? insets.bottom + 32 : 32 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SearchBar placeholder="Cari Makhluk Hidup" value={query} onChangeText={setQuery} onSubmit={submitSearch} />
        <View style={styles.controls}>
          <FilterChip
            tone={dark ? 'light' : 'dark'}
            active={filtersActive}
            onPress={() => {
              startEditing();
              setSheetOpen(true);
            }}
          />
          {path && path.length > 0 && (
            <Breadcrumb path={path} onSelect={(t) => router.push(`/encyclopedia/taxon/${t.id}`)} />
          )}
        </View>

        {title && (
          <Text
            accessibilityRole="header"
            style={[styles.title, titleWeight === 'extraBold' && styles.titleExtraBold, dark && styles.titleOnDark]}
          >
            {title}
          </Text>
        )}

        {children}
      </ScrollView>

      <FilterSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onApply={() => {
          setSheetOpen(false);
          (onFiltersApplied ?? (() => openResults(query.trim())))();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mint,
  },
  content: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 16,
  },
  controls: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    marginTop: 21,
    marginBottom: 21,
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  titleExtraBold: {
    fontFamily: fonts.extraBold,
    marginBottom: 20,
  },
  titleOnDark: {
    color: colors.onDark,
  },
});
