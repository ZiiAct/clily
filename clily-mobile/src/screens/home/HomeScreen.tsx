import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { DesignCanvas } from '../../components/DesignCanvas';
import { HomeHeader } from '../../components/home/HomeHeader';
import { FactsCard, HomeFooter, NewsHighlightsCard, TemperatureMapCard } from '../../components/home/HomeCards';
import { useFacts, useTodayHighlights } from '../../hooks/useHomeQueries';
import { useAuthStore } from '../../store/authStore';
import { colors } from '../../theme/tokens';
import type { Article } from '../../types/content.types';

/** Figma HOME SCROLL is 1662px tall; the header (129) and bottom nav (73) sit outside the canvas. */
const CANVAS_HEIGHT = 1662 - 129 - 73;

type Props = {
  onOpenProfile: () => void;
  onOpenWeather: () => void;
  onOpenArticle: (article: Article) => void;
  onOpenArticles: () => void;
  onOpenTrivia: () => void;
  onOpenHeatmap: () => void;
  onFeedback: () => void;
  onContactAdmin: () => void;
};

/** Beranda (Figma: HOME SCROLL). */
export function HomeScreen(props: Props) {
  const user = useAuthStore((s) => s.user);
  const highlights = useTodayHighlights();
  const facts = useFacts();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <HomeHeader user={user} onPressProfile={props.onOpenProfile} onPressWeather={props.onOpenWeather} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <DesignCanvas height={CANVAS_HEIGHT}>
          <NewsHighlightsCard
            articles={highlights.data}
            loading={highlights.isPending}
            error={highlights.isError}
            onRetry={() => highlights.refetch()}
            onOpenArticle={props.onOpenArticle}
            onSeeAll={props.onOpenArticles}
          />
          <FactsCard
            facts={facts.data}
            loading={facts.isPending}
            error={facts.isError}
            onRetry={() => facts.refetch()}
            onOpen={props.onOpenTrivia}
          />
          <TemperatureMapCard onOpen={props.onOpenHeatmap} />
          <HomeFooter onFeedback={props.onFeedback} onContactAdmin={props.onContactAdmin} />
        </DesignCanvas>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mint,
  },
  scroll: {
    // Start the scroll area under the header's rounded corners so cards slide beneath them...
    marginTop: -20,
  },
  scrollContent: {
    // ...while the first card still starts 18px below the header, as in Figma.
    paddingTop: 20,
  },
});
