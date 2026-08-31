export type Platform = 'tiktok' | 'instagram' | 'manual' | 'demo';
export type DownloadState = 'NOT_DOWNLOADED' | 'DOWNLOADING' | 'DOWNLOADED' | 'FAILED';
export type Availability = 'STREAMABLE' | 'DOWNLOADABLE' | 'METADATA_ONLY';

export interface Track {
  id: string;
  title: string;
  creatorName: string;
  platform: Platform;
  sourceUrl: string;
  remoteAudioUrl?: string;
  thumbnailUrl: string;
  durationMs: number;
  availability: Availability;
  localFilePath?: string;
  downloadState: DownloadState;
  isFavorite: boolean;
  playCount: number;
  createdAt: string;
}

export interface Playlist { id: string; name: string; trackIds: string[]; createdAt: string; }
export type RepeatMode = 'off' | 'queue' | 'track';
