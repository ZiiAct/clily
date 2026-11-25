import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CommentBubble from '../../assets/icons/comment-bubble.svg';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CommentsSheet } from '../../components/news/CommentsSheet';
import { SourceBadge } from '../../components/news/SourceBadge';
import { useArticle, useComments } from '../../hooks/useNewsQueries';
import { useAuthStore } from '../../store/authStore';
import { useNewsStore } from '../../store/newsStore';
import { colors, fonts, gradients } from '../../theme/tokens';

type Props = {
  articleId: string;
};

/** Isi berita (Figma: News Isi) with the Komentar sheet (Frame 130). */
export function ArticleScreen({ articleId }: Props) {
  const insets = useSafeAreaInsets();
  const { data: article, isPending, isError, refetch } = useArticle(articleId);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const comments = useComments(articleId);
  const myComments = useNewsStore((s) => s.myComments[articleId]);
  const addComment = useNewsStore((s) => s.addComment);
  const user = useAuthStore((s) => s.user);

  const allComments = comments.data ? [...comments.data, ...(myComments ?? [])] : undefined;
  // Paragraphs after the photo use the darker body color, as in Figma.
  const imageIndex = article?.body.findIndex((b) => b.type === 'image') ?? -1;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient colors={gradients.articleScreen} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFill} />
      <ScreenHeader title="Berita" />

      {!article ? (
        <View style={styles.state}>
          {isPending && <ActivityIndicator color={colors.navy} />}
          {isError && (
            <Text style={styles.stateText} onPress={() => refetch()} accessibilityRole="button">
              Artikel tidak dapat dimuat. Ketuk untuk mencoba lagi.
            </Text>
          )}
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]} showsVerticalScrollIndicator={false}>
            <Text accessibilityRole="header" style={styles.title}>
              {article.title}
            </Text>
            <View style={styles.source}>
              <SourceBadge article={article} size={35} textStyle={{ color: colors.navy, fontSize: 13 }} />
            </View>

            {article.body.map((block, i) =>
              block.type === 'image' ? (
                <Image key={i} source={block.image} style={styles.image} resizeMode="cover" />
              ) : (
                <Text key={i} style={[styles.paragraph, imageIndex >= 0 && i > imageIndex && styles.paragraphDark]}>
                  {block.text}
                </Text>
              ),
            )}
          </ScrollView>

          <Pressable
            onPress={() => setCommentsOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={`Komentar, ${allComments?.length ?? 0}`}
            style={[styles.commentButton, { bottom: insets.bottom + 24 }]}
          >
            <View style={styles.bubble}>
              <CommentBubble width={50.9458} height={49.1007} />
            </View>
            <Text style={styles.commentCount}>{allComments?.length ?? ''}</Text>
          </Pressable>

          <CommentsSheet
            visible={commentsOpen}
            comments={allComments}
            loading={comments.isPending}
            onClose={() => setCommentsOpen(false)}
            onSend={(text) => addComment(articleId, { id: `mine-${Date.now()}`, author: user?.username ?? 'Kamu', text })}
          />
        </>
      )}
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
  content: {
    paddingTop: 16,
    paddingLeft: 21,
    paddingRight: 29,
  },
  title: {
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 40,
  },
  source: {
    marginTop: 8,
    marginLeft: 6,
    marginBottom: 16,
  },
  paragraph: {
    marginLeft: 6,
    marginBottom: 19,
    textAlign: 'justify',
    color: colors.navy,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  paragraphDark: {
    color: colors.bodyDark,
  },
  image: {
    height: 212,
    marginLeft: 2,
    marginRight: -5,
    marginTop: 4,
    marginBottom: 31,
    borderRadius: 15,
  },
  commentButton: {
    position: 'absolute',
    right: 24,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    position: 'absolute',
    transform: [{ rotate: '14.69deg' }],
  },
  commentCount: {
    marginLeft: 6,
    marginTop: -6,
    color: colors.mint,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
});
