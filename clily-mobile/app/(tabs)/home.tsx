import React from 'react';
import { Alert, Linking } from 'react-native';
import { router } from 'expo-router';

import { HomeScreen } from '../../src/screens/home/HomeScreen';
import { MOCK_ARTICLES } from '../../src/mocks/news';

// Until the backend links highlights to articles, match them by id in the mock data.
const MOCK_ARTICLE_IDS = new Set(MOCK_ARTICLES.map((a) => a.id));

export default function HomeRoute() {
  return (
    <HomeScreen
      onOpenProfile={() => router.navigate('/profile')}
      onOpenWeather={() => router.push('/weather')}
      // Highlights that also exist as full articles open directly; others open the news tab.
      onOpenArticle={(a) =>
        MOCK_ARTICLE_IDS.has(a.id) ? router.push(`/articles/${a.id}`) : router.navigate('/articles')
      }
      onOpenArticles={() => router.navigate('/articles')}
      onOpenTrivia={() => router.navigate('/trivia')}
      onOpenHeatmap={() => router.push('/heatmap')}
      onFeedback={() => Alert.alert('Berikan umpan balik', 'Formulir umpan balik akan tersedia setelah backend terhubung.')}
      onContactAdmin={() => Linking.openURL('https://www.whatsapp.com')}
    />
  );
}
