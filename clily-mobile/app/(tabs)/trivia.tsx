import React from 'react';
import { View } from 'react-native';

import { ScreenHeader } from '../../src/components/ScreenHeader';
import { ComingSoon } from '../../src/components/ComingSoon';

export default function TriviaRoute() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Trivia" />
      <ComingSoon title="Trivia Hari Ini!" phase={7} />
    </View>
  );
}
