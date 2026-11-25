import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { GalleryDetailScreen } from '../../src/screens/scan/GalleryDetailScreen';

export default function GalleryDetailRoute() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  return <GalleryDetailScreen itemId={itemId} onOpenSpecies={(id) => router.push(`/encyclopedia/species/${id}`)} />;
}
