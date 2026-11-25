import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { DistributionScreen } from '../../../../src/screens/encyclopedia/DistributionScreen';

export default function DistributionRoute() {
  const { speciesId } = useLocalSearchParams<{ speciesId: string }>();
  return <DistributionScreen speciesId={speciesId} />;
}
