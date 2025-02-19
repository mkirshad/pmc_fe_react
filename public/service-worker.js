/* eslint-disable no-restricted-globals */

// Cache version
const CACHE_NAME = "pwa-cache-v6"; // Increment version to force cache update
const API_CACHE_NAME = "api-cache"; // Separate cache for API requests
const STORE_NAME = "offline-requests"; // IndexedDB Store for offline requests

const CACHE_FILES = [
    "/",
    "/index.html",
    "/img/logo/icon-192x192.png",
    "/img/logo/icon-512x512.png",
    "/favicon.ico",
    "/manifest.json"
];

// ✅ IndexedDB Helper Functions for Offline Storage
async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("OfflineDB", 1);
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveToDB(data) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).add(data);
}

async function getCachedResponse(url) {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(url);
        request.onsuccess = () => resolve(request.result ? request.result.response : null);
        request.onerror = () => resolve(null);
    });
}

async function clearStoredRequests() {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).clear();
}

// ✅ Install Event - Cache Static Assets
self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_FILES))
    );
    self.skipWaiting(); // Activate immediately
});

// ✅ Fetch Event - Cache API & Serve Offline
self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);

    // Exclude service worker itself from caching
    if (requestUrl.pathname.includes("service-worker.js")) {
        return;
    }

    // Always fetch latest `version.json` from network
    if (requestUrl.pathname.includes("version.json")) {
        event.respondWith(fetch(event.request, { cache: "no-store" }));
        return;
    }

    console.log("Service Worker fetching:", event.request.url);

    if (event.request.method === "GET") {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return (
                    cachedResponse ||
                    fetch(event.request)
                        .then((networkResponse) => {
                            return caches.open(API_CACHE_NAME).then((cache) => {
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                        })
                        .catch(() => caches.match("/index.html")) // Serve fallback when offline
                );
            })
        );
    } else if (event.request.method === "POST" && !navigator.onLine) {
        console.log("[📡 Offline] Saving POST Request for Later:", event.request.url);
        event.waitUntil(saveToDB({ url: event.request.url, method: "post", body: event.request.clone() }));
        event.respondWith(
            new Response(JSON.stringify({ message: "Saved Offline - Will Sync Later" }), {
                status: 201,
                headers: { "Content-Type": "application/json" },
            })
        );
    }
});

// ✅ Sync Stored Requests When Online
self.addEventListener("sync", async (event) => {
    if (event.tag === "sync-posts") {
        event.waitUntil(
            (async () => {
                const db = await openDB();
                const tx = db.transaction(STORE_NAME, "readonly");
                const store = tx.objectStore(STORE_NAME);
                const getAllRequests = store.getAll();

                getAllRequests.onsuccess = async () => {
                    for (const request of getAllRequests.result) {
                        try {
                            console.log("[📤 Syncing]:", request.url);
                            const body = await request.body.json(); // Ensure JSON format
                            await fetch(request.url, {
                                method: "POST",
                                body: JSON.stringify(body),
                                headers: { "Content-Type": "application/json" },
                            });
                        } catch (err) {
                            console.error("[❌ Failed to Sync]:", request.url, err);
                        }
                    }
                    await clearStoredRequests();
                };
            })()
        );
    }
});

// ✅ Activate Event - Clean Old Caches
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

// ✅ Notify Clients When New Version is Available
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
