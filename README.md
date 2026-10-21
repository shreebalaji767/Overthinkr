# Overthinkr

A playful, responsive React + Vite parody site about overthinking. Includes Home, The Spiral, Tools, and About pages, all running client-side without a database or backend.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

This repository is configured to deploy to GitHub Pages at https://shreebalaji767.github.io/Overthinkr/.

1. In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
2. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the Vite site and deploys the `dist` folder.
3. Check the **Actions** tab for deployment status.

The Vite base path is configured as `/Overthinkr/`. Client-side navigation uses hash URLs for compatibility with static hosting.

## Notes

- The text decoder and decision tool run in the browser.
- No database, API keys, or server are required.
- Google Fonts are loaded externally; system sans-serif fallbacks remain available.
