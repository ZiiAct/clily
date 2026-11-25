import React from 'react';
import { router } from 'expo-router';

import { CameraScreen } from '../src/screens/scan/CameraScreen';
import { useScan } from '../src/hooks/useScan';
import { useGalleryStore } from '../src/store/galleryStore';

export default function CameraRoute() {
  const identify = useScan();
  const latestPhoto = useGalleryStore((s) => s.items[0]?.photo);

  return (
    <CameraScreen
      latestPhoto={latestPhoto}
      onIdentify={identify}
      onShowResult={(scanId) => router.replace(`/scan/${scanId}`)}
      onOpenGallery={() => router.push('/gallery')}
    />
  );
}
