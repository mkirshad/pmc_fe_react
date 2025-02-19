// 📌 src/components/InstallPWA.tsx
import React from "react";

interface InstallPWAProps {
    deferredPrompt: any;
}

const InstallPWA: React.FC<InstallPWAProps> = ({ deferredPrompt }) => {
    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt.");
                } else {
                    console.log("User dismissed the install prompt.");
                }
            });
        }
    };

    return (
        <button onClick={handleInstall} style={{ padding: "10px", fontSize: "16px" }}>
            Install App
        </button>
    );
};

export default InstallPWA;
