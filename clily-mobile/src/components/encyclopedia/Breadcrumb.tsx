import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Chevron from '../../assets/icons/breadcrumb-chevron.svg';
import { colors, fonts, gradients } from '../../theme/tokens';
import type { Taxon } from '../../types/species.types';

type Props = {
  path: Taxon[];
  onSelect: (taxon: Taxon) => void;
};

/** Taxonomy path pill (Figma: "Component 11"). Scrolls horizontally and starts at the end, like Figma. */
export function Breadcrumb({ path, onSelect }: Props) {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.pill}>
      <LinearGradient colors={gradients.breadcrumb} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.fill} />
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        accessibilityRole="list"
        accessibilityLabel="Jalur taksonomi"
      >
        {path.map((taxon, i) => {
          const last = i === path.length - 1;
          return (
            <React.Fragment key={taxon.id}>
              {i > 0 && (
                <View style={styles.chevron}>
                  <Chevron width={5} height={10} />
                </View>
              )}
              <Text
                style={styles.item}
                onPress={last ? undefined : () => onSelect(taxon)}
                accessibilityRole={last ? 'text' : 'link'}
                suppressHighlighting
              >
                {taxon.name}
              </Text>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    height: 28,
    borderRadius: 15,
    overflow: 'hidden',
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  item: {
    color: colors.mint,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  chevron: {
    marginHorizontal: 11,
  },
});
