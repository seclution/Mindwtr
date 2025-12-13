# Web / PWA (Desktop Web Build)

Mindwtr’s desktop app can run as a browser app using the Vite build under `apps/desktop`. When running in a browser (non‑Tauri), it uses `localStorage` for persistence and registers a service worker for basic offline/PWA support.

## Run locally

From the repo root:

```bash
bun install
bun desktop:web
```

This starts Vite on `http://localhost:5173/`.

## Build for hosting

```bash
bun desktop:web:build
```

Build output is in `apps/desktop/dist/` and can be hosted as a static site.

## PWA behavior

- The app registers `apps/desktop/public/sw.js` when running in a browser.
- `sw.js` precaches `/`, `/index.html`, `/manifest.webmanifest`, `/icon.png`, `/logo.png` and caches other same-origin GET requests on demand.
- Navigation requests fall back to `/index.html` when offline (so deep links still load).

## Hosting requirements

- Host `apps/desktop/dist/` at the site root (`/`). The service worker is registered from `/sw.js` and the manifest references root paths.
- Ensure your static host serves:
  - `manifest.webmanifest` as `application/manifest+json` (recommended)
  - `sw.js` as `application/javascript`

If you need to host under a subpath (e.g. `/mindwtr/`), the service worker registration and manifest paths must be adjusted to match the base path.

## Limitations

- Browser builds store data in `localStorage` (clearing site data clears Mindwtr data).
- Some desktop-only features may be unavailable in the browser, such as file attachments that require native file access.

