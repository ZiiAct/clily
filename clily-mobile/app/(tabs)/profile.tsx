import React from 'react';
import { View } from 'react-native';

import { ScreenHeader } from '../../src/components/ScreenHeader';
import { ComingSoon } from '../../src/components/ComingSoon';

export default function ProfileRoute() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Profil Saya" />
      <ComingSoon title="Profil Saya" phase={8} />
    </View>
  );
}
