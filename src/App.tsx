import { BrowserRouter } from "react-router-dom";
import Theme from "@/components/template/Theme";
import Layout from "@/components/layouts";
import { AuthProvider } from "@/auth";
import Views from "@/views";
import appConfig from "./configs/app.config";
import "./locales";
import { useEffect } from "react";

if (appConfig.enableMock) {
    import("./mock");
}

function App() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js").then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);

                // Listen for update messages
                navigator.serviceWorker.addEventListener("message", (event) => {
                    if (event.data && event.data.type === "NEW_VERSION") {
                        if (window.confirm("A new version is available. Refresh now?")) {
                            window.location.reload();
                        }
                    }
                });
            });
        }
    }, []);

    return (
        <Theme>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Views />
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </Theme>
    );
}

export default App;
