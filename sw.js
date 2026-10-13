// Keeps the app on the phone so it opens with no connection.
// Serves the saved copy instantly, then quietly checks GitHub for a newer one
// (used the next time the app opens). Cart data is never sent anywhere.
const CACHE = "want-or-need-v1";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const key = req.mode === "navigate" ? "./index.html" : req;
    const saved = await cache.match(key, { ignoreSearch: true });
    const fresh = fetch(req).then(res => { if (res.ok) cache.put(key, res.clone()); return res }).catch(() => null);
    if (saved) { e.waitUntil(fresh); return saved }
    return (await fresh) || new Response("Offline", { status: 503 });
  }));
});
