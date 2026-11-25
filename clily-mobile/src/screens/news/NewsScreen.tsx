import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { ScreenHeader } from '../../components/ScreenHeader';
import { Skeleton, SkeletonGroup } from '../../components/Skeleton';
import { StateMessage, errorMessage } from '../../components/StateMessage';
import { SearchBar } from '../../components/SearchBar';
import { NewsCard } from '../../components/news/NewsCard';
import { useArticles } from '../../hooks/useNewsQueries';
import { useNewsStore } from '../../store/newsStore';
import { colors, layout } from '../../theme/tokens';
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
          isPending ? (
            <SkeletonGroup label="Memuat berita" style={styles.skeleton}>
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} height={214} />
              ))}
            </SkeletonGroup>
          ) : isError ? (
            <StateMessage message={errorMessage('Berita')} actionLabel="Coba lagi" onAction={() => refetch()} />
          ) : (
            <StateMessage
              message={`Tidak ada berita untuk “${query}”.`}
              actionLabel="Tampilkan semua berita"
              onAction={() => {
                setInput('');
                setQuery('');
              }}
            />
          )
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
  skeleton: {
    gap: 16,
  },
});
