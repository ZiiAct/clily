import React from 'react';
import { router } from 'expo-router';

import { RegisterScreen } from '../../src/screens/auth/RegisterScreen';

export default function RegisterRoute() {
  return (
    <RegisterScreen
      onGoToLogin={() => router.replace('/login')}
      onRegisterSuccess={() => {
        router.dismissAll();
        router.replace('/home');
      }}
    />
  );
}
