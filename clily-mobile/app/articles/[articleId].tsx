import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { ArticleScreen } from '../../src/screens/news/ArticleScreen';

export default function ArticleRoute() {
  const { articleId } = useLocalSearchParams<{ articleId: string }>();
  return <ArticleScreen articleId={articleId} />;
}
