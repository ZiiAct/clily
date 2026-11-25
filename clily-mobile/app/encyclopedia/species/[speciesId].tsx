import React from 'react';
import { View } from 'react-native';

import { ScreenHeader } from '../../../src/components/ScreenHeader';
import { ComingSoon } from '../../../src/components/ComingSoon';

// Species detail is built in Phase 5.
export default function SpeciesRoute() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Ensiklopedia" />
      <ComingSoon title="Detail Spesies" phase={5} />
    </View>
  );
}
