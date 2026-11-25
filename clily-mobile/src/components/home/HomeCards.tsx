import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import NewsPanel from '../../assets/illustrations/news-panel.svg';
import { PillButton } from './PillButton';
import { colors, fonts, gradients, shadows } from '../../theme/tokens';
import type { Article, Fact, ImageSource } from '../../types/content.types';

/**
 * Beranda cards. Coordinates are Figma pixels relative to the DesignCanvas,
 * which starts directly below the 129px header (Figma y − 129).
 */

// ---------- shared bits ----------

function Abs({ x, y, w, h, style, children }: { x: number; y: number; w?: number; h?: number; style?: StyleProp<ViewStyle>; children?: React.ReactNode }) {
  return <View style={[{ position: 'absolute', left: x, top: y, width: w, height: h }, style]}>{children}</View>;
}

function Photo({ source, x, y, w, h, shadow = true }: { source?: ImageSource; x: number; y: number; w: number; h: number; shadow?: boolean }) {
  if (!source) return null;
  return (
    <Abs x={x} y={y} w={w} h={h} style={[styles.photoFrame, shadow && shadows.thumbnail]}>
      <Image source={source} style={styles.photo} resizeMode="cover" />
    </Abs>
  );
}

function CardState({ loading, error, onRetry }: { loading: boolean; error: boolean; onRetry: () => void }) {
  if (loading) return <ActivityIndicator color={colors.mint} />;
  if (error) {
    return (
      <Text style={styles.stateText} onPress={onRetry} accessibilityRole="button">
        Gagal memuat. Ketuk untuk mencoba lagi.
      </Text>
    );
  }
  return null;
}

// ---------- "Ada Apa Hari Ini?" ----------

type NewsCardProps = {
  articles?: Article[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onOpenArticle: (article: Article) => void;
  onSeeAll: () => void;
};

function Snippet({ article, x, y, w, numberOfLines }: { article?: Article; x: number; y: number; w: number; numberOfLines: number }) {
  if (!article) return null;
  return (
    <Abs x={x} y={y} w={w}>
      <Text style={styles.snippet} numberOfLines={numberOfLines}>
        <Text style={styles.snippetLead}>{article.headline}</Text> {article.summary}
      </Text>
    </Abs>
  );
}

function ReadMore({ x, y, onPress }: { x: number; y: number; onPress: () => void }) {
  // Right edge sits at x; the label is right-aligned in a 152px box as in Figma.
  return (
    <Abs x={x - 152} y={y} w={152}>
      <Text onPress={onPress} accessibilityRole="link" style={styles.readMore} suppressHighlighting>
        selengkapnya
      </Text>
    </Abs>
  );
}

export function NewsHighlightsCard({ articles, loading, error, onRetry, onOpenArticle, onSeeAll }: NewsCardProps) {
  const [first, second, third] = articles ?? [];

  return (
    <>
      <Abs x={20} y={18} w={372} h={671} style={[styles.card, shadows.homeCard]}>
        <LinearGradient
          colors={gradients.homeNews}
          locations={[0, 0.25, 1]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill, styles.card]}
        />
      </Abs>
      <Abs x={43} y={41}>
        <NewsPanel width={327} height={623} />
      </Abs>

      <Abs x={62} y={54} w={125}>
        <Text accessibilityRole="header" style={styles.cardTitle}>
          Ada Apa Hari Ini?
        </Text>
      </Abs>

      {!articles ? (
        <Abs x={43} y={300} w={327} style={styles.center}>
          <CardState loading={loading} error={error} onRetry={onRetry} />
        </Abs>
      ) : (
        <>
          {/* Article 1: photo top-right, second photo left, snippet under the right photo */}
          <Photo source={first?.images[0]} x={201} y={60} w={152} h={99} />
          <Photo source={first?.images[1]} x={61} y={129} w={126} h={139} shadow={false} />
          <Snippet article={first} x={201} y={166} w={152} numberOfLines={5} />
          {first && <ReadMore x={353} y={255} onPress={() => onOpenArticle(first)} />}
          <Abs x={65} y={281} w={287.5} h={1} style={styles.divider} />

          {/* Article 2: wide photo + narrow photo, snippet across */}
          <Photo source={second?.images[0]} x={62} y={294} w={214} h={87} shadow={false} />
          <Photo source={second?.images[1]} x={287} y={294} w={66} h={87} />
          <Snippet article={second} x={60} y={389} w={291} numberOfLines={3} />
          {second && <ReadMore x={351} y={427} onPress={() => onOpenArticle(second)} />}
          <Abs x={63} y={455} w={287.5} h={1} style={styles.divider} />

          {/* Article 3: snippet left, photo right */}
          <Snippet article={third} x={62} y={469} w={151} numberOfLines={6} />
          <Photo source={third?.images[0]} x={227} y={469} w={126} h={108} />
          {third && <ReadMore x={213} y={560} onPress={() => onOpenArticle(third)} />}
        </>
      )}

      <Abs x={65} y={608}>
        <PillButton label="Baca lebih banyak" color={colors.ink} onPress={onSeeAll} />
      </Abs>
      <Abs x={346} y={641}>
        <Pressable
          onPress={onSeeAll}
          accessibilityRole="button"
          accessibilityLabel="Lihat semua berita"
          hitSlop={10}
          style={styles.cornerDot}
        />
      </Abs>
    </>
  );
}

// ---------- "Tahukah kamu?" ----------

const SLIDE_W = 329;
const SLIDE_H = 205;

type FactsCardProps = {
  facts?: Fact[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onOpen: () => void;
};

export function FactsCard({ facts, loading, error, onRetry, onOpen }: FactsCardProps) {
  const [index, setIndex] = useState(0);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / SLIDE_W));
  };

  return (
    <>
      <Abs x={21} y={709} w={371} h={294} style={[styles.card, shadows.homeCard]}>
        <LinearGradient
          colors={gradients.homeTrivia}
          locations={[0, 0.317, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[StyleSheet.absoluteFill, styles.card]}
        />
      </Abs>
      <Abs x={141} y={723} w={230}>
        <Text accessibilityRole="header" style={[styles.cardTitle, styles.right]}>
          Tahukah kamu?
        </Text>
      </Abs>

      <Abs x={42.5} y={767} w={SLIDE_W} h={221}>
        {!facts ? (
          <View style={[styles.slide, styles.center]}>
            <CardState loading={loading} error={error} onRetry={onRetry} />
          </View>
        ) : (
          <>
            <FlatList
              data={facts}
              keyExtractor={(f) => f.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onScrollEnd}
              style={styles.slideList}
              renderItem={({ item }) => (
                <Pressable
                  onPress={onOpen}
                  accessibilityRole="button"
                  accessibilityLabel={`Tahukah kamu: ${item.text}`}
                  style={styles.slide}
                >
                  <Image source={item.image} style={styles.photo} resizeMode="cover" />
                  <LinearGradient
                    colors={gradients.photoOverlay}
                    locations={[0, 0.33, 0.89]}
                    start={{ x: 0.6, y: 0 }}
                    end={{ x: 0.4, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                  <Text style={styles.factText} numberOfLines={4}>
                    {item.text}
                  </Text>
                </Pressable>
              )}
            />
            <View style={styles.dots} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              {facts.map((f, i) => (
                <View key={f.id} style={[styles.dot, i === index && styles.dotActive]} />
              ))}
            </View>
          </>
        )}
      </Abs>
    </>
  );
}

// ---------- "Sebaran suhu iklim dunia" ----------

const MAP_PREVIEW = require('../../assets/images/temperature-map-preview.png');

export function TemperatureMapCard({ onOpen }: { onOpen: () => void }) {
  return (
    <>
      <Abs x={21} y={1024} w={371} h={265} style={[styles.card, shadows.homeCard]}>
        <LinearGradient colors={gradients.homeMap} style={[StyleSheet.absoluteFill, styles.card]} />
      </Abs>
      <Abs x={48.5} y={1039} w={315}>
        <Text accessibilityRole="header" style={[styles.cardTitle, styles.centerText, { color: colors.onDark }]}>
          Sebaran suhu iklim dunia
        </Text>
      </Abs>
      <Abs x={42} y={1082} w={329} h={187} style={styles.mapPreview}>
        <Image source={MAP_PREVIEW} style={styles.photo} resizeMode="cover" accessibilityLabel="Pratinjau peta suhu dunia" />
      </Abs>
      <Abs x={101} y={1220}>
        <PillButton label="Masuk" onPress={onOpen} />
      </Abs>
    </>
  );
}

// ---------- Footer ----------

export function HomeFooter({ onFeedback, onContactAdmin }: { onFeedback: () => void; onContactAdmin: () => void }) {
  return (
    <Abs x={0} y={1313} w={412} h={220} style={[styles.footer, shadows.header]}>
      <LinearGradient
        colors={gradients.homeFooter}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[StyleSheet.absoluteFill, styles.footer]}
      />
      <Text onPress={onFeedback} accessibilityRole="link" style={[styles.footerLink, { marginTop: 40 }]}>
        Berikan umpan balik
      </Text>
      <Text onPress={onContactAdmin} accessibilityRole="link" style={[styles.footerLink, { marginTop: 5 }]}>
        Hubungi Admin
      </Text>
    </Abs>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: colors.white,
    fontFamily: fonts.extraBold,
    fontSize: 24,
  },
  right: {
    textAlign: 'right',
  },
  centerText: {
    textAlign: 'center',
  },
  photoFrame: {
    borderRadius: 10,
    backgroundColor: colors.blue,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  snippet: {
    color: colors.mint,
    fontFamily: fonts.poppinsRegular,
    fontSize: 12,
    textAlign: 'justify',
  },
  snippetLead: {
    fontFamily: fonts.poppinsSemiBold,
  },
  readMore: {
    textAlign: 'right',
    color: colors.onDark,
    fontFamily: fonts.poppinsMedium,
    fontSize: 10,
    textDecorationLine: 'underline',
  },
  divider: {
    backgroundColor: colors.mint,
  },
  cornerDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.mint,
  },
  stateText: {
    color: colors.mint,
    fontFamily: fonts.medium,
    fontSize: 13,
    textAlign: 'center',
  },
  slideList: {
    width: SLIDE_W,
    height: SLIDE_H,
    flexGrow: 0,
  },
  slide: {
    width: SLIDE_W,
    height: SLIDE_H,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.ink,
  },
  factText: {
    position: 'absolute',
    left: 15.5,
    right: 16.5,
    bottom: 13,
    color: colors.onDark,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  dots: {
    position: 'absolute',
    top: 212,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 1,
    borderColor: colors.mint,
  },
  dotActive: {
    backgroundColor: colors.mint,
  },
  mapPreview: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  footer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 28,
  },
  footerLink: {
    color: colors.mint,
    fontFamily: fonts.medium,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
