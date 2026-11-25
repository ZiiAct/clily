import React from 'react';
import { router } from 'expo-router';

import { WelcomeScreen } from '../../src/screens/auth/WelcomeScreen';

export default function WelcomeRoute() {
  return (
    <WelcomeScreen onLogin={() => router.push('/login')} onRegister={() => router.push('/register')} />
  );
}
