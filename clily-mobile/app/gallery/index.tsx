import React from 'react';
import { router } from 'expo-router';

import { GalleryScreen } from '../../src/screens/scan/GalleryScreen';

export default function GalleryRoute() {
  return <GalleryScreen onOpenItem={(id) => router.push(`/gallery/${id}`)} />;
}
