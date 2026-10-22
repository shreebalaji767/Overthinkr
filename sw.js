const CACHE_NAME = 'overthinkr-v4';
const SCOPE_URL = new URL('./', self.registration.scope);
const APP_SHELL = [
  SCOPE_URL.href,
  new URL('manifest.webmanifest', SCOPE_URL).href,
  new URL('overthinkr-icon.svg', SCOPE_URL).href
];

async function cacheResponse(request, response) {
  if (!response || !response.ok || response.type === 'opaque') return;
  // Clone exactly once before the response body can be consumed elsewhere.
  const copy = response.clone();
  await caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.allSettled(APP_SHELL.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith('overthinkr-') && key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(SCOPE_URL.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) event.waitUntil(cacheResponse(SCOPE_URL.href, response));
        return response;
      } catch {
        return (await caches.match(request)) || (await caches.match(SCOPE_URL.href)) ||
          new Response('You are offline and this page is not cached yet.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) event.waitUntil(cacheResponse(request, response));
      return response;
    } catch {
      return new Response('This resource is unavailable offline.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  })());
});
