import React, { useEffect, useState } from 'react';
import { Text, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useFonts,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_400Regular_Italic,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

import { colors } from '../src/theme/tokens';
import { ErrorScreen } from '../src/components/ErrorScreen';

/** expo-router renders this instead of the red error screen when a route throws. */
export function ErrorBoundary({ error, retry }: { error: Error; retry: () => Promise<void> }) {
  return <ErrorScreen onRetry={retry} details={error.message} />;
}

SplashScreen.preventAutoHideAsync();

/**
 * Respect the system text size, but cap it at 1.3× so the fixed Figma layouts
 * (Beranda, Cuaca, Peta Suhu, cards with absolute text) don't overflow.
 * Text and TextInput are forwardRef components, so defaultProps still apply.
 */
const FONT_SCALE_CAP = 1.3;
for (const Component of [Text, TextInput] as unknown as { defaultProps?: Record<string, unknown> }[]) {
  Component.defaultProps = { ...Component.defaultProps, maxFontSizeMultiplier: FONT_SCALE_CAP };
}

export default function RootLayout() {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } } }),
  );
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_400Regular_Italic,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_800ExtraBold,
  });

  const ready = fontsLoaded || fontError;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.mint },
          }}
        />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
