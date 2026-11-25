import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import BookmarkIcon from '../../assets/icons/bookmark.svg';
import BookmarkSavedIcon from '../../assets/icons/bookmark-saved.svg';
import OpenLinkIcon from '../../assets/icons/open-link.svg';
import { SourceBadge } from './SourceBadge';
import { colors, fonts, gradients } from '../../theme/tokens';
import type { NewsArticle } from '../../types/news.types';

type Props = {
  article: NewsArticle;
  bookmarked: boolean;
  onOpen: () => void;
  onToggleBookmark: () => void;
  onOpenLink: () => void;
};

/** News card (Figma: NEWS, 368 × 214, 3px navy border). */
export function NewsCard({ article, bookmarked, onOpen, onToggleBookmark, onOpenLink }: Props) {
  return (
    <Pressable
      onPress={onOpen}
      accessibilityRole="button"
      accessibilityLabel={`${article.title}, ${article.sourceName}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.clip}>
        <Image source={article.image} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <LinearGradient colors={gradients.newsOverlay} locations={[0, 0.63, 0.99]} style={StyleSheet.absoluteFill} />

        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>
        <View style={styles.source}>
          <SourceBadge article={article} size={25} textStyle={{ color: colors.white, fontSize: 10 }} />
        </View>
      </View>

      <Pressable
        onPress={onToggleBookmark}
        accessibilityRole="button"
        accessibilityLabel={bookmarked ? 'Hapus dari simpanan' : 'Simpan berita'}
        accessibilityState={{ selected: bookmarked }}
        hitSlop={8}
        style={styles.bookmark}
      >
        {bookmarked ? <BookmarkSavedIcon width={32} height={32} /> : <BookmarkIcon width={32} height={32} />}
      </Pressable>
      <Pressable onPress={onOpenLink} accessibilityRole="link" accessibilityLabel="Buka di browser" hitSlop={8} style={styles.openLink}>
        <OpenLinkIcon width={24} height={24} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 214,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: colors.navy,
    backgroundColor: colors.navy,
  },
  pressed: {
    opacity: 0.9,
  },
  clip: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  title: {
    position: 'absolute',
    left: 14,
    right: 54,
    bottom: 47,
    color: colors.white,
    fontFamily: fonts.extraBold,
    fontSize: 20,
  },
  source: {
    position: 'absolute',
    left: 14,
    bottom: 12,
  },
  bookmark: {
    position: 'absolute',
    top: 10,
    right: 8,
  },
  openLink: {
    position: 'absolute',
    right: 13,
    bottom: 18,
  },
});
