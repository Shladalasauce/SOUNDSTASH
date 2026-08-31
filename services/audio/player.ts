import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RepeatMode as NativeRepeatMode } from 'react-native-track-player';
import { RepeatMode, Track } from '@/types';

let setupPromise: Promise<void> | undefined;

export function setupPlayer() {
  if (!setupPromise) setupPromise = (async () => {
    try { await TrackPlayer.setupPlayer({ autoHandleInterruptions: true }); } catch (error) {
      if (!String(error).includes('already been initialized')) throw error;
    }
    await TrackPlayer.updateOptions({
      android: { appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback },
      capabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious, Capability.SeekTo],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
      progressUpdateEventInterval: 1,
    });
  })();
  return setupPromise;
}

const asNativeTrack = (track: Track) => ({
  id: track.id, url: track.localFilePath || track.remoteAudioUrl || '', title: track.title,
  artist: track.creatorName, artwork: track.thumbnailUrl, duration: track.durationMs / 1000,
});

export async function playQueue(tracks: Track[], startId: string) {
  await setupPlayer();
  const playable = tracks.filter((t) => t.localFilePath || t.remoteAudioUrl);
  await TrackPlayer.reset(); await TrackPlayer.add(playable.map(asNativeTrack));
  const index = playable.findIndex((t) => t.id === startId);
  if (index >= 0) await TrackPlayer.skip(index);
  await TrackPlayer.play();
}

export const setNativeRepeat = (mode: RepeatMode) => TrackPlayer.setRepeatMode(
  mode === 'track' ? NativeRepeatMode.Track : mode === 'queue' ? NativeRepeatMode.Queue : NativeRepeatMode.Off,
);
