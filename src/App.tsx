import { BrowserRouter } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Theme from "@/components/template/Theme";
import Layout from "@/components/layouts";
import { AuthProvider } from "@/auth";
import Views from "@/views";
import appConfig from "./configs/app.config";
import "./locales";
import InstallPWA from "./InstallPWA"; // Ensure correct path

if (appConfig.enableMock) {
    import("./mock");
}

function App() {
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const deferredPromptRef = useRef<Event | null>(null);

    // ✅ Handle Service Worker Registration & Updates
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js").then((registration) => {
                console.log("✅ Service Worker registered with scope:", registration.scope);

                // Listen for new service worker updates
                registration.addEventListener("updatefound", () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener("statechange", () => {
                            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                                console.log("🚀 New version available.");
                                setUpdateAvailable(true);
                            }
                        });
                    }
                });

                // Listen for messages from the service worker
                navigator.serviceWorker.addEventListener("message", (event) => {
                    if (event.data?.type === "NEW_VERSION") {
                        console.log("🔄 New version detected!");
                        setUpdateAvailable(true);
                    }
                });
            }).catch((error) => console.error("❌ Service Worker registration failed:", error));
        }
    }, []);

    // ✅ Handle PWA Install Prompt
    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            deferredPromptRef.current = event;
            setShowInstallPrompt(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }, []);

    // ✅ Function to Update the PWA
    const updatePWA = () => {
        if (navigator.serviceWorker?.controller) {
            navigator.serviceWorker.controller.postMessage({ action: "SKIP_WAITING" });
        }

        navigator.serviceWorker.ready.then((registration) => {
            registration.waiting?.postMessage({ type: "SKIP_WAITING" });
        });

        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return (
        <>
        <Theme>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Views />
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </Theme>
        
         {/* Show install prompt if available */}
         {showInstallPrompt && deferredPromptRef.current && (
                            <InstallPWA deferredPrompt={deferredPromptRef.current} />
                        )}

        {/* Show update button when a new version is detected */}
        {updateAvailable && (
            <button
                onClick={updatePWA}
                style={{ 
                    position: "fixed", 
                    bottom: "20px", 
                    right: "20px", 
                    padding: "12px 20px", 
                    fontSize: "16px", 
                    backgroundColor: "#007bff", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px", 
                    cursor: "pointer",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
                }}
            >
                🔄 Update Available - Refresh
            </button>
        )}

        </>
    );
}

export default App;
