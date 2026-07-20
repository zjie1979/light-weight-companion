const CACHE_NAME = "light-weight-companion-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=3",
  "./app.js?v=3",
  "./manifest.webmanifest",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./shared/companion-shell.css",
  "./shared/companion-shell.js",
  "./modules/checkin/",
  "./modules/checkin/index.html",
  "./modules/checkin/styles.css",
  "./modules/checkin/app.js",
  "./modules/weight-log/",
  "./modules/weight-log/index.html",
  "./modules/weight-log/styles.css",
  "./modules/weight-log/app.js",
  "./modules/dinner/",
  "./modules/dinner/index.html",
  "./modules/dinner/styles.css?v=2-jin",
  "./modules/dinner/app.js?v=2-jin",
  "./modules/loop/",
  "./modules/loop/index.html",
  "./modules/loop/styles.css",
  "./modules/loop/app.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => event.request.mode === "navigate" ? caches.match(new URL("./", self.registration.scope)) : undefined))
  );
});
