/* eslint-disable no-restricted-globals */

// Cache version
const CACHE_NAME = "pwa-cache-v56"; // Increment version to force cache update
const STORE_NAME = "offline-requests";
const DB_NAME = "OfflineDB";
const API_CACHE_NAME = "api-cache";

// ✅ Files to Cache for Offline Support
const CACHE_FILES = [
    "/",
    "/index.html",
    "/img/logo/icon-192x192.png",
    "/img/logo/icon-512x512.png",
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
self.addEventListener("install", async (event) => {
    console.log("🚀 Service Worker installing...");

    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                const cachePromises = CACHE_FILES.map(async (file) => {
                    try {
                        const response = await fetch(file, { cache: "no-store" });
                        if (!response.ok) throw new Error(`Failed to fetch ${file}`);
                        await cache.put(file, response);
                    } catch (error) {
                        console.error(`[❌ Cache Error] Could not cache: ${file}`, error.message);
                    }
                });

                await Promise.all(cachePromises);
                console.log("✅ All files cached successfully!");

            } catch (err) {
                console.error("[❌ Service Worker Install Failed]", err.message);
            }
        })()
    );

    self.skipWaiting();
});

// ✅ Fetch Event - Handle API Requests & Serve Offline
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const requestUrl = new URL(request.url);

    // ✅ Skip service worker file itself
    if (requestUrl.pathname.includes("service-worker.js")) return;

    // ✅ Handle GET Requests - Use Cache First, Then Network Fallback
    if (request.method === "GET") {
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        console.log("[📂 Serving from Cache]:", request.url);
                        return cachedResponse;
                    }

                    console.log("[🌐 Fetching from Network]:", request.url);
                    return fetch(request)
                        .then((networkResponse) => {
                            return caches.open(API_CACHE_NAME).then((cache) => {
                                cache.put(request, networkResponse.clone());
                                return networkResponse;
                            });
                        })
                        .catch(() => {
                            console.warn("[❌ Offline] No cache available for:", request.url);
                            return caches.match("/index.html"); // Fallback to the index page
                        });
                })
        );
        return;
    }

    // ✅ Handle Offline POST/PATCH Requests (Store in IndexedDB for Sync)
    if ((request.method === "POST" || request.method === "PATCH") && !navigator.onLine) {
        console.warn("[⚠️ Offline] Saving request for later:", request.url);

        event.waitUntil(
            request.clone().text().then((bodyText) => {
                saveToDB({
                    url: request.url,
                    method: request.method,
                    body: bodyText, // Convert to JSON string
                    headers: Object.fromEntries(request.headers.entries()), // Convert headers to object
                });
            })
        );

        event.respondWith(new Response(
            JSON.stringify({ message: "Saved Offline - Will Retry Later" }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        ));
        return;
    }
});


// ✅ Retry Stored Requests When Online

// ✅ Sync Stored Requests When Online
self.addEventListener("sync", async (event) => {
    console.log('its in sync')
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