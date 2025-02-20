/* eslint-disable no-restricted-globals */

// Cache version
const CACHE_NAME = "pwa-cache-v50"; // Increment version to force cache update
const STORE_NAME = "offline-requests";
const DB_NAME = "OfflineDB";
const API_CACHE_NAME = "api-cache";

// ✅ Files to Cache for Offline Support
const CACHE_FILES = [
    "/",
    "/index.html",
    "/img/",
    "/assets/",
    "/favicon.ico",
    "/manifest.json"
];

// ✅ IndexedDB Helper Functions
async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
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

async function getStoredRequests() {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve([]);
    });
}

async function clearStoredRequests() {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).clear();
}

// ✅ Install Event - Cache Static Assets
self.addEventListener("install", (event) => {
    console.log("🚀 Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_FILES))
    );
    self.skipWaiting();
});

// ✅ Fetch Event - Handle API Requests & Serve Offline
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const requestUrl = new URL(request.url);

    if (requestUrl.pathname.includes("service-worker.js")) return;

    if (request.method === "GET") {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    return caches.open(API_CACHE_NAME).then((cache) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => caches.match(request).then((cachedResponse) => {
                    return cachedResponse || caches.match("/index.html");
                }))
        );
    }

    if ((request.method === "POST" || request.method === "PATCH") && !navigator.onLine) {
        console.log("[📡 Offline] Saving request for later:", request.url);
        event.waitUntil(saveToDB({ url: request.url, method: request.method, body: request.clone() }));

        event.respondWith(new Response(JSON.stringify({ message: "Saved Offline - Will Retry Later" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        }));
    }
});

// ✅ Retry Stored Requests When Online
self.addEventListener("sync", async (event) => {
    if (event.tag === "sync-posts") {
        event.waitUntil(
            (async () => {
                const storedRequests = await getStoredRequests();
                for (const request of storedRequests) {
                    try {
                        await fetch(request.url, { method: request.method, body: JSON.stringify(request.body) });
                    } catch (err) {
                        console.error("[❌ Failed to Sync]:", request.url, err);
                    }
                }
                await clearStoredRequests();
            })()
        );
    }
});
