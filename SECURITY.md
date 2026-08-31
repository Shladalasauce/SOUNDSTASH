# Security Policy

## Reporting a vulnerability

Please do not open a public issue for a suspected vulnerability. Contact the
repository owner privately through the email address on their GitHub profile and
include reproduction steps, affected versions, and the potential impact.

Do not include credentials, personal data, or exploit payloads beyond what is
needed to reproduce the issue.

## Credential handling

SoundStash runs in local demo mode without credentials. Local `.env` files are
ignored by Git. The committed `.env.example` contains placeholders only.

Variables prefixed with `EXPO_PUBLIC_` are embedded in the client bundle and must
never contain secrets. OAuth client secrets and service-role keys belong in a
server-side secret store, such as Supabase Edge Function secrets.
