import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig
} from "axios";
import AxiosResponseIntrceptorErrorCallback from "./AxiosResponseIntrceptorErrorCallback";
import AxiosRequestIntrceptorConfigCallback from "./AxiosRequestIntrceptorConfigCallback";
import appConfig from "@/configs/app.config";

// ✅ IndexedDB Constants
const DB_NAME = "OfflineRequestsDB";
const STORE_NAME = "requests";

// ✅ Open IndexedDB Database
async function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// ✅ Save Request Data to IndexedDB
async function saveToDB(data: { url: string; method: "post" | "get"; data?: any }) {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.add(data);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// ✅ Retrieve Cached GET Response
async function getCachedResponse(url: string): Promise<any | null> {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(url);
        request.onsuccess = () => resolve(request.result ? request.result.response : null);
        request.onerror = () => resolve(null);
    });
}

// ✅ Clear Stored Offline Requests
async function clearStoredRequests() {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// ✅ Create Axios Instance
const AxiosBase: AxiosInstance = axios.create({
    timeout: 180000,
    baseURL: appConfig.apiPrefix,
});

// ✅ Request Interceptor: Handle Offline Mode
AxiosBase.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
        // Handle GET Requests - Serve from Cache if Offline
        if (config.method === "get" && typeof config.url === "string") {
            const cachedResponse = await getCachedResponse(config.url);
            
            if (!navigator.onLine && cachedResponse) {
                console.log("[🔄 Offline] Serving Cached Data for:", config.url);

                // Create a mock Axios response
                const mockResponse: AxiosResponse = {
                    data: cachedResponse,
                    status: 200,
                    statusText: "OK",
                    headers: {},
                    config,
                    request: {},
                };

                return Promise.reject({ response: mockResponse });
            }
        }

        // Handle Offline POST Requests (Save Locally)
        if (config.method === "post" && typeof config.url === "string" && !navigator.onLine) {
            console.log("[📡 Offline] Saving POST Request for Later:", config.url);
            await saveToDB({ url: config.url, method: "post", data: config.data });

            // ✅ Return a "fake success" response to prevent Axios errors
            return Promise.reject({
                response: {
                    data: { message: "Saved Offline - Will Sync Later" },
                    status: 201,
                    statusText: "Created",
                    headers: {},
                    config,
                    request: {},
                }
            });
        }

        return AxiosRequestIntrceptorConfigCallback(config);
    },
    (error: AxiosError) => Promise.reject(error)
);

// ✅ Response Interceptor: Cache Successful GET Responses
AxiosBase.interceptors.response.use(
    async (response: AxiosResponse) => {
        if (response.config.method === "get" && response.status === 200 && response.config.url) {
            console.log("[💾 Caching Data]:", response.config.url);
            await saveToDB({ url: response.config.url, method: "get", data: response.data });
        }
        return response;
    },
    async (error: AxiosError) => {
        if (!navigator.onLine) {
            console.warn("[⚠️ Offline] Request Failed:", error.config?.url);
        }
        AxiosResponseIntrceptorErrorCallback(error);
        return Promise.reject(error);
    }
);

// ✅ Retry Stored Requests When Online
window.addEventListener("online", async () => {
    console.log("[🔄 Online] Resending Stored Requests...");
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const getAllRequests = store.getAll();

    getAllRequests.onsuccess = async () => {
        for (const request of getAllRequests.result) {
            try {
                console.log("[📤 Syncing]:", request.url);
                await AxiosBase.post(request.url, request.data);
            } catch (err) {
                console.error("[❌ Failed to Sync]:", request.url, err);
            }
        }
        await clearStoredRequests();
    };
});

export default AxiosBase;
