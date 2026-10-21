# Overthinkr

A playful, responsive React + Vite parody site about overthinking. Includes Home, The Spiral, Tools, and About pages, plus a chaos console, brain-weather check-in, saved thoughts, theme toggle, text decoder, and decision helper.

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

The GitHub Actions workflow builds the production site and checks that the generated JavaScript bundle, manifest, icon, and service worker are present before deployment.

## GitHub Pages deployment

The public site is intended to be published at https://shreebalaji767.github.io/Overthinkr/.

1. Open **Settings → Pages** for this repository.
2. Under **Build and deployment → Source**, select **GitHub Actions** (not **Deploy from a branch**).
3. Push to `main`, or manually run **Deploy Overthinkr to GitHub Pages** from the Actions tab.
4. Confirm that both the build and deploy jobs complete successfully.
5. Open the site and do a hard refresh (`Ctrl+Shift+R`) after deployment.

Vite uses `/Overthinkr/` as its base path. The source `index.html` references `src/main.jsx` for local development; the production build rewrites this to a compiled file under `/Overthinkr/assets/`. If browser devtools still shows a request to `/src/main.jsx`, GitHub Pages is serving the repository source instead of the generated `dist` artifact.

## Notes

- Client-side navigation uses hash URLs for static-hosting compatibility.
- The text decoder and decision helper run entirely in the browser.
- Saved thoughts and theme preferences use local storage when available; the app remains usable if storage is blocked.
- No database, API keys, or application server are required.
- Google Fonts are loaded externally; system sans-serif fallbacks remain available.
- Browser warnings about unsupported `Permissions-Policy` features are hosting/browser header warnings, not React runtime errors. GitHub Pages does not provide per-project custom response-header configuration.
- This is a parody and general-reflection site, not a medical or mental-health service.
