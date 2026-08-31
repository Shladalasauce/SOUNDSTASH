import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { demoTracks } from '@/features/library/demo-data';
import { Playlist, RepeatMode, Track } from '@/types';

interface State {
  tracks: Track[]; playlists: Playlist[]; queueIds: string[]; currentTrackId?: string;
  repeatMode: RepeatMode; shuffle: boolean;
  setCurrent: (id: string) => void; setQueue: (ids: string[]) => void;
  toggleFavorite: (id: string) => void; toggleShuffle: () => void; cycleRepeat: () => void;
  addTrack: (track: Track) => void; updateTrack: (id: string, patch: Partial<Track>) => void;
  createPlaylist: (name: string) => void; addToPlaylist: (playlistId: string, trackId: string) => void;
}

export const useSoundStash = create<State>()(persist((set) => ({
  tracks: demoTracks,
  playlists: [{ id: 'favorites-mix', name: 'Late Night Finds', trackIds: ['demo-2', 'demo-5'], createdAt: new Date().toISOString() }],
  queueIds: demoTracks.map((t) => t.id), currentTrackId: undefined, repeatMode: 'off', shuffle: false,
  setCurrent: (id) => set({ currentTrackId: id }), setQueue: (ids) => set({ queueIds: ids }),
  toggleFavorite: (id) => set((s) => ({ tracks: s.tracks.map((t) => t.id === id ? { ...t, isFavorite: !t.isFavorite } : t) })),
  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
  cycleRepeat: () => set((s) => ({ repeatMode: s.repeatMode === 'off' ? 'queue' : s.repeatMode === 'queue' ? 'track' : 'off' })),
  addTrack: (track) => set((s) => ({ tracks: [track, ...s.tracks] })),
  updateTrack: (id, patch) => set((s) => ({ tracks: s.tracks.map((t) => t.id === id ? { ...t, ...patch } : t) })),
  createPlaylist: (name) => set((s) => ({ playlists: [...s.playlists, { id: `${Date.now()}`, name, trackIds: [], createdAt: new Date().toISOString() }] })),
  addToPlaylist: (playlistId, trackId) => set((s) => ({ playlists: s.playlists.map((p) => p.id === playlistId && !p.trackIds.includes(trackId) ? { ...p, trackIds: [...p.trackIds, trackId] } : p) })),
}), { name: 'soundstash-library-v1', storage: createJSONStorage(() => AsyncStorage) }));
