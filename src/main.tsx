import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
);

// ✅ Register the service worker
serviceWorkerRegistration.register({
    onUpdate: (registration) => {
        if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
            window.location.reload(); // Reload to activate the new service worker
        }
    },
});

// ✅ Request Background Sync for Failed POST Requests
if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready
        .then((swRegistration) => {
            return swRegistration.sync.register("sync-posts");
        })
        .catch((err) => console.error("[❌ Sync registration failed]:", err));
}

// ✅ Listen for Service Worker Messages (for Updates)
navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data && event.data.type === "NEW_VERSION") {
        console.log("[⚡ New Version Available] Please refresh to update.");
        alert("A new version is available! Please refresh to update.");
    }
});
