import React from 'react';
import { Tabs } from 'expo-router';

import { BottomNav } from '../../src/components/BottomNav';
import { colors } from '../../src/theme/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.mint },
      }}
    >
      {/* Beranda shows the bottom nav but has no tab of its own; it's reached via the header's home button. */}
      <Tabs.Screen name="home" />
      <Tabs.Screen name="encyclopedia" />
      <Tabs.Screen name="trivia" />
      <Tabs.Screen name="articles" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
