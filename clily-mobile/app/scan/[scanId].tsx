import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { ScanResultScreen } from '../../src/screens/scan/ScanResultScreen';

export default function ScanResultRoute() {
  const { scanId } = useLocalSearchParams<{ scanId: string }>();
  return (
    <ScanResultScreen
      scanId={scanId}
      onOpenDistribution={(id) => router.push(`/encyclopedia/species/${id}/distribution`)}
      onOpenSpecies={(id) => router.push(`/encyclopedia/species/${id}`)}
    />
  );
}
