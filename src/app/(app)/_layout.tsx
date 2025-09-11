import { Redirect, Stack } from 'expo-router';
import React from 'react';

import { WebLayout } from '@/components/layout/web-layout';
import { colors } from '@/components/ui';
import { useAuth, useIsFirstTime } from '@/lib';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <WebLayout>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Feed' }} />
        <Stack.Screen name="style" options={{ title: 'Style' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack>
    </WebLayout>
  );
}
