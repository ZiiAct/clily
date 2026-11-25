import React from 'react';
import { View } from 'react-native';

import { ScreenHeader } from '../src/components/ScreenHeader';
import { ComingSoon } from '../src/components/ComingSoon';

export default function CameraRoute() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Kamera" />
      <ComingSoon title="Kamera / Scan" phase={6} />
    </View>
  );
}
