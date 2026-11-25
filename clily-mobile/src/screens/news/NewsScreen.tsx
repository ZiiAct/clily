import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { ScreenHeader } from '../../components/ScreenHeader';
import { SearchBar } from '../../components/SearchBar';
import { NewsCard } from '../../components/news/NewsCard';
import { useArticles } from '../../hooks/useNewsQueries';
import { useNewsStore } from '../../store/newsStore';
import { colors, fonts, layout } from '../../theme/tokens';
import type { NewsArticle } from '../../types/news.types';

type Props = {
  onOpenArticle: (article: NewsArticle) => void;
  onOpenLink: (article: NewsArticle) => void;
};

/** Berita Terhangat (Figma: NEWS). */
export function NewsScreen({ onOpenArticle, onOpenLink }: Props) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const { data: articles, isPending, isError, refetch } = useArticles(query);
  const bookmarks = useNewsStore((s) => s.bookmarks);
  const toggleBookmark = useNewsStore((s) => s.toggleBookmark);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScreenHeader title="Berita Terhangat" />

      <FlatList
        data={articles ?? []}
        keyExtractor={(a) => a.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <SearchBar
            placeholder="Cari Topik Berita dan Laman"
            value={input}
            onChangeText={(text) => {
              setInput(text);
              if (!text) setQuery('');
            }}
            onSubmit={() => setQuery(input)}
            style={styles.search}
          />
        }
        ListEmptyComponent={
          <View style={styles.state}>
            {isPending ? (
              <ActivityIndicator color={colors.navy} />
            ) : isError ? (
              <Text style={styles.stateText} onPress={() => refetch()} accessibilityRole="button">
                Berita gagal dimuat. Ketuk untuk mencoba lagi.
              </Text>
            ) : (
              <Text style={styles.stateText}>Tidak ada berita untuk “{query}”.</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            bookmarked={!!bookmarks[item.id]}
            onOpen={() => onOpenArticle(item)}
            onToggleBookmark={() => toggleBookmark(item.id)}
            onOpenLink={() => onOpenLink(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
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
    paddingBottom: 32,
  },
  search: {
    marginBottom: 16,
  },
  gap: {
    height: 16,
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
});
