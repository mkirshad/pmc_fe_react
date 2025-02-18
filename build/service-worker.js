/* eslint-disable no-restricted-globals */

// Cache version
const CACHE_NAME = "pwa-cache-v3"; // Increment version to force cache update
const CACHE_FILES = [
    "/",
    "/index.html",
    "/img/logo/icon-192x192.png",
    "/img/logo/icon-512x512.png",
    "/favicon.ico",
];

// Install event - Precache assets
self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_FILES);
        })
    );
    self.skipWaiting(); // Activate new SW immediately
});

// Fetch event - Cache dynamic assets & serve from cache when offline
self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);

    // Exclude service-worker.js from being cached
    if (requestUrl.pathname.includes("service-worker.js")) {
        return;
    }

    console.log("Service Worker fetching:", event.request.url);
    
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
                .then((networkResponse) => {
                    // Cache dynamically loaded assets (JS, CSS, images)
                    if (event.request.url.includes("/assets/")) {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // If offline, return fallback page
                    if (event.request.mode === "navigate") {
                        return caches.match("/index.html");
                    }
                });
        })
    );
});

// Activate event - Clean old caches
self.addEventListener("activate", (event) => {
    console.log("Service Worker activating...");
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
    self.clients.claim(); // Take control of open pages
});
