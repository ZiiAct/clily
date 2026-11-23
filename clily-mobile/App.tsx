import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';

type AuthPage = 'login' | 'register' | 'home';

export default function App() {
  const [page, setPage] = useState<AuthPage>('login');

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />

      {page === 'login' && (
        <LoginScreen
          onGoToRegister={() => setPage('register')}
        />
      )}

      {page === 'register' && (
        <RegisterScreen
          onGoToLogin={() => setPage('login')}
        />
      )}

      {page === 'home' && <HomeScreen />}
    </SafeAreaProvider>
  );
}
