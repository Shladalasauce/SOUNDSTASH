import { detectPlatform, InstagramProvider, TikTokProvider } from '@/services/social/providers';
test.each([['https://www.tiktok.com/@x/video/1','tiktok'],['https://instagram.com/reel/abc','instagram'],['https://example.com/audio','manual']])('detects %s', (url, expected) => expect(detectPlatform(url)).toBe(expected));
test('providers honestly advertise unavailable saved sounds', () => { expect(new TikTokProvider().capabilities.savedSounds).toBe(false); expect(new InstagramProvider().capabilities.savedSounds).toBe(false); });
