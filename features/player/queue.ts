import { RepeatMode, Track } from '@/types';

export function nextIndex(current: number, length: number, repeat: RepeatMode): number | null {
  if (!length) return null;
  if (repeat === 'track') return current;
  if (current + 1 < length) return current + 1;
  return repeat === 'queue' ? 0 : null;
}

export function shuffled<T>(items: T[], random = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function deduplicateTracks(items: Track[]): Track[] {
  const seen = new Set<string>();
  return items.filter((track) => {
    const key = `${track.platform}:${track.sourceUrl.replace(/\/$/, '')}`;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}
