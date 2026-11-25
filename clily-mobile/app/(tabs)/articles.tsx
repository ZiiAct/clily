import React from 'react';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

import { NewsScreen } from '../../src/screens/news/NewsScreen';

export default function ArticlesRoute() {
  return (
    <NewsScreen
      onOpenArticle={(a) => router.push(`/articles/${a.id}`)}
      onOpenLink={(a) => WebBrowser.openBrowserAsync(a.url)}
    />
  );
}
