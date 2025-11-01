const BASE_URL = import.meta.env.BASE_URL || '/horse-racing-game/';
const CACHE_NAME = 'horse-racing-game-v1';

// During install, cache all static assets automatically
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        // Fetch asset manifest (list of files in dist)
        const manifestResponse = await fetch(`${BASE_URL}asset-manifest.json`);
        const manifest = await manifestResponse.json();

        const urlsToCache = Object.values(manifest).map((path) => `${BASE_URL}${path}`);

        // Add root files manually
        urlsToCache.push(
          `${BASE_URL}index.html`,
          `${BASE_URL}favicon.ico`
        );

        console.log('[Service Worker] Caching files:', urlsToCache);
        return cache.addAll(urlsToCache);
      } catch (err) {
        console.warn('[Service Worker] Could not fetch manifest, fallback to minimal cache', err);
        // Fallback: only cache minimal files
        return cache.addAll([
          `${BASE_URL}index.html`,
          `${BASE_URL}favicon.ico`,
        ]);
      }
    })
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch handler: cache first, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
