import React, { useEffect, useState } from "react";

interface InstallPWAProps {
    deferredPrompt: any; // Accepts the event passed from App.tsx
}

const InstallPWA: React.FC<InstallPWAProps> = ({ deferredPrompt }) => {
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        if (deferredPrompt) {
            console.log("✅ PWA install prompt is available.");
            setIsInstallable(true);
        } else {
            console.log("⚠️ PWA install prompt is not available.");
        }
    }, [deferredPrompt]);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            console.log("❌ Install prompt is not available.");
            return;
        }

        deferredPrompt.prompt(); // Show install prompt

        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
            console.log("✅ User accepted the install prompt.");
        } else {
            console.log("❌ User dismissed the install prompt.");
        }

        deferredPrompt = null; // Prevent multiple prompts
        setIsInstallable(false); // Hide the button after prompt
    };

    if (!isInstallable) return null; // Hide button if not installable

    return (
        <button 
            onClick={handleInstall} 
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
            📲 Install App
        </button>
    );
};

export default InstallPWA;
