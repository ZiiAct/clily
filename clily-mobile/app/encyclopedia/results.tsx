import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { SpeciesResultsScreen } from '../../src/screens/encyclopedia/SpeciesResultsScreen';

export default function ResultsRoute() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  return <SpeciesResultsScreen initialQuery={q ?? ''} />;
}
