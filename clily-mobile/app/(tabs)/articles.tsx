import React from 'react';
import { View } from 'react-native';

import { ScreenHeader } from '../../src/components/ScreenHeader';
import { ComingSoon } from '../../src/components/ComingSoon';

export default function ArticlesRoute() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Berita" />
      <ComingSoon title="Berita Terhangat" phase={7} />
    </View>
  );
}
