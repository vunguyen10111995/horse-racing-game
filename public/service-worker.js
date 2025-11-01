// Horse Racing Game - Service Worker
// Enables offline functionality and PWA features
const BASE_URL = '/horse-racing-game/';

const urlsToCache = [
  `${BASE_URL}`,
  `${BASE_URL}index.html`,
  `${BASE_URL}icons/icon-32x32.png`,
  `${BASE_URL}icons/icon-16x16.png`,
  `${BASE_URL}icons/icon-144x14.png`,
];
const CACHE_NAME = "horse-racing-v1";
const RUNTIME_CACHE = "horse-racing-runtime-v1";

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching app shell");
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log("[Service Worker] Installed successfully");
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("[Service Worker] Installation failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("[Service Worker] Activated successfully");
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Cache-first strategy for navigation requests
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          console.log("[Service Worker] Serving from cache:", request.url);
          return response;
        }

        console.log("[Service Worker] Fetching from network:", request.url);
        return fetch(request)
          .then((response) => {
            // Cache the new response
            return caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          })
          .catch(() => {
            // If offline and no cache, return offline page
            return caches.match("/index.html");
          });
      })
    );
    return;
  }

  // Cache-first strategy for assets (JS, CSS, images)
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image" ||
    request.destination === "font"
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(request)
          .then((response) => {
            // Don't cache if not a success response
            if (
              !response ||
              response.status !== 200 ||
              response.type === "error"
            ) {
              return response;
            }

            // Cache the fetched asset
            return caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          })
          .catch((error) => {
            console.error("[Service Worker] Fetch failed:", error);
            throw error;
          });
      })
    );
    return;
  }

  // Network-first for everything else
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Log service worker lifecycle
console.log("[Service Worker] Loaded");
