import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { colors } from '@/constants/theme';
import { setupPlayer } from '@/services/audio/player';

const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, primary: colors.accent } };
export default function RootLayout() {
  useEffect(() => { setupPlayer().catch(console.warn); }, []);
  return <ThemeProvider value={theme}><StatusBar style="light" />
    <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background }, headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/><Stack.Screen name="player" options={{ presentation: 'modal', headerShown: false }}/>
      <Stack.Screen name="add" options={{ title: 'Add Sound', presentation: 'modal' }}/>
    </Stack></ThemeProvider>;
}
