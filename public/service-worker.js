/* eslint-disable no-restricted-globals */

// Cache version
const CACHE_NAME = "pwa-cache-v5"; // Increment version to force cache update
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

// Fetch event - Cache assets & serve from cache when offline
self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);

    // Always fetch latest `version.json` from network
    if (requestUrl.pathname.includes("version.json")) {
        event.respondWith(fetch(event.request, { cache: "no-store" }));
        return;
    }

    // Exclude service-worker.js from being cached
    if (requestUrl.pathname.includes("service-worker.js")) {
        return;
    }

    console.log("Service Worker fetching:", event.request.url);

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
                .then((networkResponse) => {
                    // Cache dynamically loaded assets
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

// Check for new version and notify clients
async function checkForUpdates() {
    try {
        const latestVersionResponse = await fetch("/version.json", { cache: "no-store" });
        const latestVersion = await latestVersionResponse.json();

        const cache = await caches.open(CACHE_NAME);
        const cachedVersionResponse = await cache.match("/version.json");

        if (cachedVersionResponse) {
            const cachedVersion = await cachedVersionResponse.json();

            if (cachedVersion.version !== latestVersion.version) {
                console.log("New version detected:", latestVersion.version);

                self.registration.showNotification("Update Available", {
                    body: "A new version is available. Refresh to update.",
                    icon: "/img/logo/icon-192x192.png",
                });

                // Notify all open clients (tabs)
                self.clients.matchAll().then((clients) => {
                    clients.forEach((client) => client.postMessage({ type: "NEW_VERSION" }));
                });
            }
        }

        // Cache latest version.json
        cache.put("/version.json", latestVersionResponse.clone());
    } catch (error) {
        console.error("Error checking version:", error);
    }
}

// Periodic check for updates
self.addEventListener("periodicsync", (event) => {
    if (event.tag === "check-updates") {
        event.waitUntil(checkForUpdates());
    }
});

// Force update when a new service worker is installed
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

// Activate event - Clean old caches and apply new version
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
