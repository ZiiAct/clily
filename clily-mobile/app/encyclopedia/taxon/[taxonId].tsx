import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { EncyclopediaScreen } from '../../../src/screens/encyclopedia/EncyclopediaScreen';

export default function TaxonRoute() {
  const { taxonId } = useLocalSearchParams<{ taxonId: string }>();
  return <EncyclopediaScreen taxonId={taxonId ?? null} />;
}
