import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { fonts } from '../../theme/tokens';
import type { NewsArticle } from '../../types/news.types';

type Props = {
  article: Pick<NewsArticle, 'sourceName' | 'sourceLogo' | 'sourceColor'>;
  /** 25px on cards, 35px on the article page */
  size: number;
  textStyle: { color: string; fontSize: number };
};

/** Source logo in a colored circle + source name (Figma: NEWS / News Isi). */
export function SourceBadge({ article, size, textStyle }: Props) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`Sumber: ${article.sourceName}`}>
      <View style={[styles.logo, { width: size, height: size, borderRadius: size / 2, backgroundColor: article.sourceColor }]}>
        <Image source={article.sourceLogo} style={styles.logoImage} resizeMode="contain" />
      </View>
      <Text style={[styles.name, textStyle]} numberOfLines={1}>
        {article.sourceName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '78%',
    height: '78%',
  },
  name: {
    marginLeft: 5,
    fontFamily: fonts.semiBold,
  },
});
