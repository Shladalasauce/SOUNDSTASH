import * as FileSystem from 'expo-file-system/legacy';
import { Track } from '@/types';

export async function downloadTrack(track: Track): Promise<{ uri: string; size?: number }> {
  if (!track.remoteAudioUrl || track.availability !== 'DOWNLOADABLE') throw new Error('This track is not available for permitted download.');
  const directory = `${FileSystem.documentDirectory}audio/`;
  await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  const uri = `${directory}${track.id}.mp3`;
  const result = await FileSystem.downloadAsync(track.remoteAudioUrl, uri);
  if (result.status < 200 || result.status >= 300) throw new Error(`Download failed (${result.status}).`);
  const info = await FileSystem.getInfoAsync(uri);
  return { uri, size: info.exists && 'size' in info ? info.size : undefined };
}
