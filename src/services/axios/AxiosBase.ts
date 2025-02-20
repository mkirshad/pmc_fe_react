import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosError,
    AxiosResponse
} from "axios";
import AxiosResponseIntrceptorErrorCallback from "./AxiosResponseIntrceptorErrorCallback";
import AxiosRequestIntrceptorConfigCallback from "./AxiosRequestIntrceptorConfigCallback";
import appConfig from "@/configs/app.config";

// ✅ IndexedDB Constants
const DB_NAME = "OfflineRequestsDB";
const STORE_NAME = "requests";

// ✅ Open IndexedDB Database with Exception Handling
async function openDB(): Promise<IDBDatabase | null> {
    try {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, 1);
            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => {
                console.error("[❌ IndexedDB Error] Failed to open DB", request.error);
                reject(null);
            };
        });
    } catch (error) {
        console.error("[❌ IndexedDB Exception] Error opening DB:", error);
        return null;
    }
}

// ✅ Convert FormData to JSON (For IndexedDB Storage)
function formDataToJson(formData: FormData) {
    const json: any = {};
    formData.forEach((value, key) => {
        json[key] = value;
    });
    return json;
}

// ✅ Convert JSON back to FormData
function jsonToFormData(json: any) {
    const formData = new FormData();
    Object.keys(json).forEach((key) => {
        formData.append(key, json[key]);
    });
    return formData;
}

// ✅ Save Failed Requests to IndexedDB
async function saveToDB(data: { url: string; method: string; body?: any; headers?: any }) {
    try {
        if (data.body instanceof FormData) {
            data.body = formDataToJson(data.body);
        }
        const db = await openDB();
        if (!db) return;
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).add(data);
    } catch (error) {
        console.error("[❌ IndexedDB Error] Failed to save request:", error);
    }
}

// ✅ Retrieve Stored Requests
async function getStoredRequests(): Promise<any[]> {
    try {
        const db = await openDB();
        if (!db) return [];
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, "readonly");
            const store = tx.objectStore(STORE_NAME);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve([]);
        });
    } catch (error) {
        console.error("[❌ IndexedDB Error] Failed to retrieve requests:", error);
        return [];
    }
}

// ✅ Clear Processed Requests from DB
async function clearStoredRequests() {
    try {
        const db = await openDB();
        if (!db) return;
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).clear();
    } catch (error) {
        console.error("[❌ IndexedDB Error] Failed to clear stored requests:", error);
    }
}

// ✅ Create Axios Instance
const AxiosBase: AxiosInstance = axios.create({
    timeout: 180000,
    baseURL: appConfig.apiPrefix,
});

// ✅ Request Interceptor: Handle Offline Mode
AxiosBase.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
        if (typeof config.url !== "string") return config;

        // Apply authentication headers, tokens, etc.
        config = AxiosRequestIntrceptorConfigCallback(config);

        // Handle GET Requests - Try Live First, Then Cache
        if (config.method === "get") {
            console.log("[🌐 Live] Trying API:", config.url);
            return config;
        }

        // Handle Offline POST/PATCH Requests - Save to IndexedDB for Retry
        if ((config.method === "post" || config.method === "patch") && !navigator.onLine) {
            console.warn("[⚠️ Offline] Storing request for later:", config.url);
            await saveToDB({ url: config.url, method: config.method, body: config.data, headers: config.headers });

            return Promise.reject({
                response: {
                    data: { message: "Saved Offline - Will Retry Later" },
                    status: 201,
                    statusText: "Created",
                    headers: {},
                    config,
                    request: {},
                }
            });
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// ✅ Response Interceptor: Cache Successful GET Responses
AxiosBase.interceptors.response.use(
    async (response: AxiosResponse) => {
        if (response.config.method === "get" && response.status === 200) {
            console.log("[💾 Caching Data]:", response.config.url);
            await saveToDB({ url: response.config.url as string, method: "get", body: response.data });
        }
        return response;
    },
    async (error: AxiosError) => {
        console.warn("[❌ API Failed] Checking Cache:", error.config?.url);
        AxiosResponseIntrceptorErrorCallback(error);
        return Promise.reject(error);
    }
);

// ✅ Retry Stored Requests When Online
// // ✅ Retry Stored Requests When Online
window.addEventListener("online", async () => {
    console.log("[🔄 Online] Resending Stored Requests...");

    const storedRequests = await getStoredRequests();

    for (const request of storedRequests) {
        try {
            console.log("[📤 Syncing]:", request.url);

            if (!request.url || !request.method) {
                console.error("[❌ Invalid Request] Missing URL or method:", request);
                continue; // Skip this request
            }

            // ✅ Convert JSON back to FormData if needed
            if (request.body && request.headers?.["Content-Type"] === "multipart/form-data") {
                request.body = jsonToFormData(request.body);
            }

            let response;

            if (request.method.toLowerCase() === "post") {
                response = await AxiosBase.post(request.url, request.body);
            } else if (request.method.toLowerCase() === "patch") {
                response = await AxiosBase.patch(request.url, request.body);
            } else {
                console.warn(`[⚠️ Skipping] Unsupported method: ${request.method}`, request);
                continue;
            }

            console.log("[✅ Synced Successfully]:", response.status, request.url);

        } catch (err: any) {
            console.error("[❌ Failed to Sync]:", request.url, err.message);

            if (err.response) {
                console.error("➡️ Server Response:", err.response.status, err.response.data);
            }

            if (err.code === "ERR_NETWORK") {
                console.warn("🚨 Network Error - Server might be down!");
            }
        }
    }

    await clearStoredRequests();
});



export default AxiosBase;
