import React from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { ResetPasswordScreen } from '../../../src/screens/auth/ResetPasswordScreen';

export default function ResetPasswordRoute() {
  return (
    <ResetPasswordScreen
      onDone={() => {
        // Return to Login and drop the forgot-password screens from history.
        router.dismissTo('/login');
        Alert.alert('Password berhasil diubah', 'Silakan masuk dengan password baru Anda.');
      }}
    />
  );
}
