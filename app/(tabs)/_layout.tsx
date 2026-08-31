import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MiniPlayer } from '@/components/MiniPlayer';
import { colors } from '@/constants/theme';

const icons: Record<string, keyof typeof Ionicons.glyphMap> = { index: 'home', library: 'albums', playlists: 'list', downloads: 'arrow-down-circle', settings: 'settings' };
export default function TabLayout() {
  return <><Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted,
    tabBarStyle: { backgroundColor: '#0D0F12', borderTopColor: colors.border, height: 80, paddingTop: 7 },
    tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name] || 'ellipse'} size={size} color={color}/> })}>
    <Tabs.Screen name="index" options={{ title: 'Home' }}/><Tabs.Screen name="library" options={{ title: 'Library' }}/>
    <Tabs.Screen name="playlists" options={{ title: 'Playlists' }}/><Tabs.Screen name="downloads" options={{ title: 'Downloads' }}/>
    <Tabs.Screen name="settings" options={{ title: 'Settings' }}/>
  </Tabs><MiniPlayer/></>;
}
