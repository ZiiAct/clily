import React from 'react';
import { router } from 'expo-router';

import { ForgotMethodScreen } from '../../../src/screens/auth/ForgotMethodScreen';

export default function ForgotMethodRoute() {
  return (
    <ForgotMethodScreen
      onBack={() => router.back()}
      onSelect={(method) => router.push({ pathname: '/forgot-password/verify', params: { method } })}
    />
  );
}
