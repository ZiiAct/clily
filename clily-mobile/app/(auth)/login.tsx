import React from 'react';
import { router } from 'expo-router';

import { LoginScreen } from '../../src/screens/auth/LoginScreen';

export default function LoginRoute() {
  return (
    <LoginScreen
      onGoToRegister={() => router.replace('/register')}
      onForgotPassword={() => router.push('/forgot-password')}
      onLoginSuccess={() => {
        router.dismissAll();
        router.replace('/home');
      }}
    />
  );
}
