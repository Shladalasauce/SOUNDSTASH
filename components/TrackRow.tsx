import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';
import { Track } from '@/types';

export function TrackRow({ track, onPress }: { track: Track; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: .7 }]}>
    <Image source={{ uri: track.thumbnailUrl }} style={styles.art} />
    <View style={styles.copy}><Text numberOfLines={1} style={styles.title}>{track.title}</Text>
      <Text numberOfLines={1} style={styles.meta}>{track.downloadState === 'DOWNLOADED' ? '↓  ' : ''}{track.creatorName} · {track.platform}</Text></View>
    <Ionicons name={track.isFavorite ? 'heart' : 'ellipsis-horizontal'} size={20} color={track.isFavorite ? colors.accent : colors.muted} />
  </Pressable>;
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }, art: { width: 54, height: 54, borderRadius: 10, backgroundColor: colors.raised }, copy: { flex: 1 }, title: { color: colors.text, fontSize: 16, fontWeight: '700' }, meta: { color: colors.muted, marginTop: 5, textTransform: 'capitalize', fontSize: 12 } });
