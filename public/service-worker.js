/* eslint-disable no-restricted-globals */

// Cache version
const CACHE_NAME = "pwa-cache-v67"; // Increment version to force cache update
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
    "/manifest.json",
    "/pub",
    "/mis-directory",
    "/mis/directory",
    "/mis/recycling-efficiency",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/auth/mis/directory",
    "/auth/EPAOperations/AllInspections",
    "/auth/EPAOperations/ReportViolation",
    "/auth/EPAOperation/Dashboard",
    "/auth/mis/recycling-efficiency",
    "/home",
    "/home-license",
    "/home-super",
    "/home-deo",
    "/home-admin",
    "/home-do",
    "/track-application",
    "/reset-password",
    "/error",
    "/single-menu-view",
    "/collapse-menu-item-view-1",
    "/collapse-menu-item-view-2",
    "/collapse-menu-item-view-3",
    "/group-single-menu-item-view",
    "/group-collapse-menu-item-view-1",
    "/group-collapse-menu-item-view-2",
    "/analytics1",
    "/spuid-signup",
    "/spuid-review"
];


// ✅ IndexedDB Helper Functions
// async function openDB() {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open(DB_NAME, 1);
//         request.onupgradeneeded = (event) => {
//             const db = event.target.result;
//             if (!db.objectStoreNames.contains(STORE_NAME)) {
//                 db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
//             }
//         };
//         request.onsuccess = () => resolve(request.result);
//         request.onerror = () => reject(request.error);
//     });
// }

// async function saveToDB(data) {
//     const db = await openDB();
//     const tx = db.transaction(STORE_NAME, "readwrite");
//     tx.objectStore(STORE_NAME).add(data);
// }

// async function getStoredRequests() {
//     const db = await openDB();
//     return new Promise((resolve) => {
//         const tx = db.transaction(STORE_NAME, "readonly");
//         const store = tx.objectStore(STORE_NAME);
//         const request = store.getAll();
//         request.onsuccess = () => resolve(request.result);
//         request.onerror = () => resolve([]);
//     });
// }

// async function clearStoredRequests() {
//     const db = await openDB();
//     const tx = db.transaction(STORE_NAME, "readwrite");
//     tx.objectStore(STORE_NAME).clear();
// }

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

// // ✅ Fetch Event - Handle API Requests & Serve Offline
// self.addEventListener("fetch", (event) => {
//     const { request } = event;
//     const requestUrl = new URL(request.url);

//     // ✅ Skip service worker file itself
//     if (requestUrl.pathname.includes("service-worker.js")) return;

//     // ✅ Handle GET Requests - Use Cache First, Then Network Fallback
//     if (request.method === "GET") {
//         event.respondWith(
//             caches.match(request)
//                 .then((cachedResponse) => {
//                     if (cachedResponse) {
//                         console.log("[📂 Serving from Cache]:", request.url);
//                         return cachedResponse;
//                     }

//                     console.log("[🌐 Fetching from Network]:", request.url);
//                     return fetch(request)
//                         .then((networkResponse) => {
//                             return caches.open(API_CACHE_NAME).then((cache) => {
//                                 cache.put(request, networkResponse.clone());
//                                 return networkResponse;
//                             });
//                         })
//                         .catch(() => {
//                             console.warn("[❌ Offline] No cache available for:", request.url);
//                             return caches.match("/index.html"); // Fallback to the index page
//                         });
//                 })
//         );
//         return;
//     }

//     // ✅ Handle Offline POST/PATCH Requests (Store in IndexedDB for Sync)
//     // if ((request.method === "POST" || request.method === "PATCH") && !navigator.onLine) {
//     //     console.warn("[⚠️ Offline] Saving request for later:", request.url, request.method);

//     //     event.waitUntil(
//     //         request.clone().text().then(async (bodyText) => {
//     //             await saveToDB({
//     //                 url: request.url,
//     //                 method: request.method,
//     //                 body: bodyText, // Convert to JSON string
//     //                 headers: Object.fromEntries(request.headers.entries()), // Convert headers to object
//     //             });

//     //             // ✅ Register Sync Event
//     //             // if ('serviceWorker' in navigator && 'SyncManager' in window) {
//     //             //     navigator.serviceWorker.ready.then((registration) => {
//     //             //         registration.sync.register("sync-posts").catch((err) => {
//     //             //             console.error("[❌ Sync Registration Failed]", err);
//     //             //         });
//     //             //     });
//     //             // } else {
//     //             //     console.warn("[⚠️ Background Sync Not Supported]");
//     //             // }
//     //         })
//     //     );

//     //     event.respondWith(new Response(
//     //         JSON.stringify({ message: "Saved Offline - Will Retry Later" }),
//     //         { status: 201, headers: { "Content-Type": "application/json" } }
//     //     ));
//     //     return;
//     // }

// });


// ✅ Retry Stored Requests When Online

// // ✅ Sync Stored Requests When Online
// self.addEventListener("online", (event) => {
//     console.log("[🔄 Sync Event Triggered]:", event.tag);

//     if (event.tag === "sync-posts") {
//         event.waitUntil(
//             (async () => {
//                 const storedRequests = await getStoredRequests();

//                 for (const request of storedRequests) {
//                     try {
//                         console.log("[📤 Syncing]:", request.url);

//                         // ✅ Convert stored string back to JSON
//                         const body = request.body ? JSON.parse(request.body) : null;

//                         // ✅ Use AxiosBase instead of fetch()
//                         let response;
//                         if (request.method === "PATCH") {
//                             response = await AxiosBase.patch(request.url, body, {
//                                 headers: request.headers,
//                             });
//                         } else {
//                             response = await AxiosBase.post(request.url, body, {
//                                 headers: request.headers,
//                             });
//                         }

//                         console.log("[✅ Sync Successful]:", request.url, response.data);

//                     } catch (err) {
//                         console.error("[❌ Failed to Sync]:", request.url, err);
//                     }
//                 }

//                 await clearStoredRequests();
//             })()
//         );
//     }
// });

self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);

    // ✅ Check for dynamic routes like /spuid-signup/:id or /spuid-review/:id
    if (requestUrl.pathname.startsWith("/spuid-signup/") || requestUrl.pathname.startsWith("/spuid-review/")) {
        event.respondWith(
            caches.match("/spuid-signup") // Serve the base cached page
                .then((response) => response || fetch(event.request))
                .catch(() => caches.match("/index.html")) // Fallback to index.html if needed
        );
        return;
    }

    // ✅ Normal caching logic for other routes
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(API_CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => caches.match("/index.html")); // Fallback when offline
        })
    );
});


