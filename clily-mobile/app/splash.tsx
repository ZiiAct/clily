import React from 'react';
import { router } from 'expo-router';

import { SplashScreen } from '../src/screens/auth/SplashScreen';
import { useAuthStore } from '../src/store/authStore';

export default function SplashRoute() {
  const user = useAuthStore((s) => s.user);
  return <SplashScreen onContinue={() => router.replace(user ? '/home' : '/welcome')} />;
}
