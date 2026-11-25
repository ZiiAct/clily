import React from 'react';
import { Alert, Linking } from 'react-native';
import { router } from 'expo-router';

import { HomeScreen } from '../../src/screens/home/HomeScreen';

export default function HomeRoute() {
  return (
    <HomeScreen
      onOpenProfile={() => router.navigate('/profile')}
      onOpenWeather={() => router.push('/weather')}
      // Article detail is built in Phase 7; until then "selengkapnya" opens the news tab.
      onOpenArticle={() => router.navigate('/articles')}
      onOpenArticles={() => router.navigate('/articles')}
      onOpenTrivia={() => router.navigate('/trivia')}
      onOpenHeatmap={() => router.push('/heatmap')}
      onFeedback={() => Alert.alert('Berikan umpan balik', 'Formulir umpan balik akan tersedia setelah backend terhubung.')}
      onContactAdmin={() => Linking.openURL('https://www.whatsapp.com')}
    />
  );
}
