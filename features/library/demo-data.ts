import { Track } from '@/types';
import { Image } from 'react-native';

const names = [
  ['Afterglow Drive', 'Mira Vale'], ['Neon Soft', 'Analog Youth'], ['Night Bus', 'Lowkey Atlas'],
  ['Golden Hour Loop', 'June Meridian'], ['Static Hearts', 'Violet Radio'], ['Sunday Motion', 'Daytrip'],
  ['Blue Arcade', 'Cassette Club'], ['Rooftop Echo', 'Nova Bloom'], ['Midnight Citrus', 'Sol Park'],
  ['Slow Satellite', 'Paper Planets'],
];

const publicDomainAudio = [
  'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tarantella%20-%20Air%20Force%20Strings%20-%20United%20States%20Air%20Force%20Band.mp3',
  'https://commons.wikimedia.org/wiki/Special:Redirect/file/Shenandoah%20%282017%29%20-%20Singing%20Sergeants%20-%20United%20States%20Air%20Force%20Band.mp3',
];

const demoArtwork = Image.resolveAssetSource(require('@/assets/images/icon.png')).uri;

export const demoTracks: Track[] = names.map(([title, creatorName], index) => ({
  id: `demo-${index + 1}`, title, creatorName,
  platform: index % 2 ? 'instagram' : 'tiktok',
  sourceUrl: 'https://soundstash.local/demo',
  remoteAudioUrl: publicDomainAudio[index % publicDomainAudio.length],
  thumbnailUrl: demoArtwork,
  durationMs: 360000, availability: 'DOWNLOADABLE', downloadState: 'NOT_DOWNLOADED',
  isFavorite: index === 1 || index === 4, playCount: index * 2,
  createdAt: new Date(Date.now() - index * 86400000).toISOString(),
}));
