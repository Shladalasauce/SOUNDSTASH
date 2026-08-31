import { deduplicateTracks, nextIndex, shuffled } from '@/features/player/queue';
import { demoTracks } from '@/features/library/demo-data';

describe('playback queue', () => {
  test('progresses and stops at the end', () => { expect(nextIndex(0, 2, 'off')).toBe(1); expect(nextIndex(1, 2, 'off')).toBeNull(); });
  test('repeat one keeps the current track', () => expect(nextIndex(1, 3, 'track')).toBe(1));
  test('repeat all wraps', () => expect(nextIndex(2, 3, 'queue')).toBe(0));
  test('shuffle preserves every item', () => expect(shuffled([1,2,3], () => 0).sort()).toEqual([1,2,3]));
  test('duplicate canonical URLs are removed', () => expect(deduplicateTracks([demoTracks[0], {...demoTracks[0], id:'copy'}])).toHaveLength(1));
});
