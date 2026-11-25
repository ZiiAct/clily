import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { VerifyCodeScreen } from '../../../src/screens/auth/VerifyCodeScreen';

export default function VerifyCodeRoute() {
  const { method } = useLocalSearchParams<{ method?: string }>();

  return (
    <VerifyCodeScreen
      method={method === 'sms' ? 'sms' : 'email'}
      onVerified={() => router.replace('/forgot-password/reset')}
    />
  );
}
