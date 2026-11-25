import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { SpeciesDetailScreen } from '../../../../src/screens/encyclopedia/SpeciesDetailScreen';

export default function SpeciesRoute() {
  const { speciesId } = useLocalSearchParams<{ speciesId: string }>();
  return (
    <SpeciesDetailScreen
      speciesId={speciesId}
      onOpenDistribution={() => router.push(`/encyclopedia/species/${speciesId}/distribution`)}
    />
  );
}
