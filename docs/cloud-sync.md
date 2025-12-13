# Cloud Sync (Self‑Hosted)

Mindwtr includes a minimal self-hosted Cloud Sync backend under `apps/cloud`. It stores one JSON file per token and is designed to be deployed behind your own HTTPS reverse proxy.

## Server

### Run locally

From the repo root:

```bash
bun install
bun run --filter mindwtr-cloud dev -- --host 0.0.0.0 --port 8787
```

Or directly:

```bash
cd apps/cloud
bun run dev -- --host 0.0.0.0 --port 8787
```

### Configuration

- `HOST` (default: `0.0.0.0`)
- `PORT` (default: `8787`)
- `MINDWTR_CLOUD_DATA_DIR` (default: `apps/cloud/data/` when running from that directory)
- `MINDWTR_CLOUD_RATE_WINDOW_MS` (default: `60000`)
- `MINDWTR_CLOUD_RATE_MAX` (default: `120`)

### Endpoints

- `GET /health` → `{ ok: true }`
- `GET /v1/data` → returns your `AppData` JSON (requires auth)
- `PUT /v1/data` → replaces your `AppData` JSON (requires auth)

Auth uses a bearer token:

```
Authorization: Bearer <token>
```

The server hashes the token (SHA-256) and uses it as the filename, so each token maps to one data file.

## Client setup (Desktop/Mobile)

In Settings → Sync:

- Set **Cloud URL** to `https://your-domain.example/v1/data`
- Set **Access token** to any long random string you control

## Security notes

- The cloud server does **not** enforce HTTPS; deploy behind an HTTPS reverse proxy.
- CORS is `*` by design for self-hosted usage; protect the endpoint with a secret token and network controls.
- Treat the bearer token like a password (anyone with it can read/write your data).

