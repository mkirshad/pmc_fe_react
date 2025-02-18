/* eslint-disable no-restricted-globals */

// Cache version
const CACHE_NAME = "pwa-cache-v1";
const CACHE_FILES = [
    "/",
    "/index.html",
    "/img/logo/icon-192x192.png",
    "/img/logo/icon-512x512.png",
    "/favicon.ico",
];

// Install event - caching assets
self.addEventListener("install", (event: ExtendableEvent) => {
    console.log("Service Worker installing.");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_FILES);
        })
    );
});

// Fetch event - serve cached assets if available
self.addEventListener("fetch", (event: FetchEvent) => {
    console.log("Service Worker fetching:", event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate event - clean old caches
self.addEventListener("activate", (event: ExtendableEvent) => {
    console.log("Service Worker activating.");
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
});
