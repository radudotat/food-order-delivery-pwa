const cacheName = 'offline-cache-v2';
const contentToCache = [
  '/icon-512.png',
  '/icon-192.png',
  '/favicon.ico',
  '/icons/maskable_icon.png',
  '/icons/maskable_icon_x128.png',
  '/icons/maskable_icon_x48.png',
  '/icons/maskable_icon_x72.png',
  '/icons/maskable_icon_x96.png',
  '/offline.html',
  '/',
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  // console.log('Hello world from the Service Worker 🤙');
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log(
        '[Service Worker install] Caching all: app shell and content',
      );
      await cache.addAll(contentToCache);
    })(),
  );
});

self.addEventListener('fetch', (e) => {
  // console.log(`[Service Worker fetch] Fetched resource`, e);
});

self.addEventListener('push', (e) => {
  // console.log(`[Service Worker push] Fetched resource`, e);
});

self.addEventListener('sync', (e) => {
  // console.log(`[Service Worker sync] Fetched resource`, e);
});

self.addEventListener('periodicsync', (e) => {
  // console.log(`[Service Worker periodicsync] Fetched resource`, e);
});

self.__WB_DISABLE_DEV_LOGS = true;
