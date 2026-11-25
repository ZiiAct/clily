import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ComingSoon } from '../../src/components/ComingSoon';

export default function HomeRoute() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ComingSoon title="Beranda" phase={3} />
    </SafeAreaView>
  );
}
