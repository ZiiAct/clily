import React from 'react';
import { router } from 'expo-router';

import { ForgotPasswordScreen } from '../../../src/screens/auth/ForgotPasswordScreen';

export default function ForgotPasswordRoute() {
  return (
    <ForgotPasswordScreen
      onNext={() => router.push('/forgot-password/method')}
      onBackToLogin={() => router.back()}
    />
  );
}
