import React from 'react';
import { Linking } from 'react-native';
import { router } from 'expo-router';

import { ProfileScreen } from '../../src/screens/profile/ProfileScreen';

export default function ProfileRoute() {
  return (
    <ProfileScreen
      // Same destination as Beranda's "Hubungi Admin" until a support channel is defined.
      onContactSupport={() => Linking.openURL('https://www.whatsapp.com')}
      onLoggedOut={() => {
        router.dismissAll();
        router.replace('/welcome');
      }}
    />
  );
}
