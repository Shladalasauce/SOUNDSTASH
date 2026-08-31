import { z } from 'zod';
import { Platform, Track } from '@/types';

export type ProviderCapability = { oauth: boolean; savedSounds: boolean; resolveUrl: boolean; dataExportImport: boolean };
export interface SocialPlatformProvider {
  platform: Platform; capabilities: ProviderCapability;
  authenticate(): Promise<'CAPABILITY_NOT_CONFIGURED' | 'CAPABILITY_NOT_SUPPORTED'>;
  resolveSharedUrl(url: string): Promise<Partial<Track>>;
}

const urlSchema = z.string().url();
export function detectPlatform(url: string): 'tiktok' | 'instagram' | 'manual' {
  const host = new URL(urlSchema.parse(url)).hostname.replace(/^www\./, '').toLowerCase();
  if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) return 'tiktok';
  if (host === 'instagram.com' || host.endsWith('.instagram.com')) return 'instagram';
  return 'manual';
}

abstract class MetadataOnlyProvider implements SocialPlatformProvider {
  abstract platform: Platform; abstract capabilities: ProviderCapability;
  async authenticate() { return 'CAPABILITY_NOT_CONFIGURED' as const; }
  async resolveSharedUrl(url: string) {
    urlSchema.parse(url);
    return { sourceUrl: url, platform: this.platform, availability: 'METADATA_ONLY' as const,
      title: `Saved from ${this.platform}`, creatorName: 'Open original post for details' };
  }
}
export class TikTokProvider extends MetadataOnlyProvider { platform = 'tiktok' as const; capabilities = { oauth: true, savedSounds: false, resolveUrl: true, dataExportImport: true }; }
export class InstagramProvider extends MetadataOnlyProvider { platform = 'instagram' as const; capabilities = { oauth: true, savedSounds: false, resolveUrl: true, dataExportImport: true }; }
export class ManualImportProvider extends MetadataOnlyProvider { platform = 'manual' as const; capabilities = { oauth: false, savedSounds: false, resolveUrl: true, dataExportImport: false }; }

export function providerFor(url: string): SocialPlatformProvider {
  const platform = detectPlatform(url);
  return platform === 'tiktok' ? new TikTokProvider() : platform === 'instagram' ? new InstagramProvider() : new ManualImportProvider();
}
