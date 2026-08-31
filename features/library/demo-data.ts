import { Track } from '@/types';

const names = [
  ['Afterglow Drive', 'Mira Vale'], ['Neon Soft', 'Analog Youth'], ['Night Bus', 'Lowkey Atlas'],
  ['Golden Hour Loop', 'June Meridian'], ['Static Hearts', 'Violet Radio'], ['Sunday Motion', 'Daytrip'],
  ['Blue Arcade', 'Cassette Club'], ['Rooftop Echo', 'Nova Bloom'], ['Midnight Citrus', 'Sol Park'],
  ['Slow Satellite', 'Paper Planets'],
];

export const demoTracks: Track[] = names.map(([title, creatorName], index) => ({
  id: `demo-${index + 1}`, title, creatorName,
  platform: index % 2 ? 'instagram' : 'tiktok',
  sourceUrl: 'https://soundstash.local/demo',
  remoteAudioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(index % 8) + 1}.mp3`,
  thumbnailUrl: `https://picsum.photos/seed/soundstash-${index + 1}/500/500`,
  durationMs: 360000, availability: 'DOWNLOADABLE', downloadState: 'NOT_DOWNLOADED',
  isFavorite: index === 1 || index === 4, playCount: index * 2,
  createdAt: new Date(Date.now() - index * 86400000).toISOString(),
}));
