import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenHeader } from '../../src/components/ScreenHeader';
import { SearchBar } from '../../src/components/SearchBar';
import { FilterChip } from '../../src/components/FilterChip';
import { ComingSoon } from '../../src/components/ComingSoon';
import { layout, spacing } from '../../src/theme/tokens';

export default function EncyclopediaRoute() {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Ensiklopedia" />
      <View style={styles.controls}>
        <SearchBar placeholder="Cari Makhluk Hidup" value={query} onChangeText={setQuery} />
        <FilterChip style={styles.filter} />
      </View>
      <ComingSoon title="Kingdom dan Filum" phase={4} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  controls: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
  },
  filter: {
    marginTop: spacing.sm,
  },
});
