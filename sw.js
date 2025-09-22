
const CACHE_NAME = 'txtadv-v1';
const CORE = [
  './',
  './index.html',
  './style.css',
  './scripts/game.js',
  './manifest.json',
  './assets/modules.json',
  './assets/encounters_highlands.json',
  './assets/codex_highlands.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(CORE)).then(self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(e.request);
      if (cached) return cached;
      try {
        const res = await fetch(e.request);
        if (res.ok && e.request.method === 'GET' && !e.request.url.includes('chrome-extension')) {
          cache.put(e.request, res.clone());
        }
        return res;
      } catch(err) {
        return cached || new Response('Offline and resource not cached.', {status: 503});
      }
    } )());
  }
});
