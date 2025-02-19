import { BrowserRouter } from "react-router-dom";
import Theme from "@/components/template/Theme";
import Layout from "@/components/layouts";
import { AuthProvider } from "@/auth";
import Views from "@/views";
import appConfig from "./configs/app.config";
import "./locales";
import { useEffect, useState, useRef, MutableRefObject } from "react";
import InstallPWA from "./InstallPWA"; // Ensure correct path

if (appConfig.enableMock) {
    import("./mock");
}

function App() {
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const deferredPrompt: MutableRefObject<null | any> = useRef(null);

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js").then((registration) => {
                console.log("✅ Service Worker registered with scope:", registration.scope);

                navigator.serviceWorker.addEventListener("message", (event) => {
                    if (event.data?.type === "NEW_VERSION") {
                        if (window.confirm("A new version is available. Refresh now?")) {
                            window.location.reload();
                        }
                    }
                });
            });
        }

        // ✅ Handle PWA Install Prompt
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            deferredPrompt.current = event as any;
            setShowInstallPrompt(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    return (
        <Theme>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <>
                            <Views />
                            {showInstallPrompt && <InstallPWA deferredPrompt={deferredPrompt.current} />}
                        </>
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </Theme>
    );
}

export default App;
