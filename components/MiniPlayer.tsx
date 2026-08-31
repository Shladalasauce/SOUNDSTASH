import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { router } from 'expo-router';
import { colors } from '@/constants/theme';
import { useSoundStash } from '@/store/useSoundStash';

export function MiniPlayer() {
  const id = useSoundStash((s) => s.currentTrackId); const track = useSoundStash((s) => s.tracks.find((t) => t.id === id));
  const playback = usePlaybackState(); if (!track) return null;
  const playing = playback.state === State.Playing;
  return <Pressable onPress={() => router.push('/player')} style={styles.bar}>
    <Image source={{ uri: track.thumbnailUrl }} style={styles.art}/><View style={{ flex: 1 }}><Text numberOfLines={1} style={styles.title}>{track.title}</Text><Text style={styles.meta}>{track.creatorName}</Text></View>
    <Pressable hitSlop={15} onPress={() => playing ? TrackPlayer.pause() : TrackPlayer.play()}><Ionicons name={playing ? 'pause' : 'play'} size={25} color={colors.text}/></Pressable>
    <Pressable hitSlop={15} onPress={() => TrackPlayer.skipToNext()}><Ionicons name="play-skip-forward" size={21} color={colors.text}/></Pressable>
  </Pressable>;
}
const styles = StyleSheet.create({ bar: { position: 'absolute', bottom: 72, left: 8, right: 8, height: 62, borderRadius: 13, padding: 7, paddingRight: 16, flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: '#252930' }, art: { width: 48, height: 48, borderRadius: 8 }, title: { color: colors.text, fontWeight: '700' }, meta: { color: colors.muted, fontSize: 12, marginTop: 3 } });
