# SoundStash implementation plan

1. **Device-first shell — complete:** Expo Router, development client, native audio configuration, five-tab dark UI, ten demo tracks.
2. **Playback foundation — complete:** persistent queue state, background service, lock-screen metadata/actions, shuffle/repeat, full and mini players.
3. **Library foundation — complete:** offline metadata search, playlists, app-private downloads for permitted demo audio, paste-link provider adapters.
4. **Backend foundation — complete:** Supabase relational schema and owner-only RLS policies; environment contract included.
5. **Credential-dependent integration — next:** connect Supabase Auth and deploy OAuth/metadata Edge Functions after project and platform credentials are supplied.
6. **Native extension — next:** add an iOS Share Extension target after the core development build is signed and verified on a physical iPhone.
