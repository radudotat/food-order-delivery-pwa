self.addEventListener('install', function (e) {
  self.skipWaiting();
  console.log('Hello world from the Service Worker 🤙');
  e.waitUntil(
    (async () => {
      // const cache = await caches.open(cacheName);
      console.log(
        '[Service Worker install] Caching all: app shell and content',
      );
      // await cache.addAll(contentToCache);
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
