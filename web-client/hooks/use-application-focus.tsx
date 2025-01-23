import { useEffect, useState } from "react";

/**
 * React hook used to determine if the application is currently out of focus/not visible to the user
 * Meaning they have clicked away to another tab or another screen
 */
export const useApplicationInFocus = () => {
    const [inFocus, setInFocus] = useState(() => {
        // Check if document is defined (ensures SSR compatibility)
        if (typeof document !== "undefined") {
            return document.visibilityState === "visible";
        }
        return true; // Default to true if on the server
    });

    useEffect(() => {
        // Ensure this only runs in the browser
        if (typeof document === "undefined") return;

        // Add an event listener to the document to listen for visibility changes
        const visibilityChange = () =>
            setInFocus(document.visibilityState === "visible");

        document.addEventListener("visibilitychange", visibilityChange);

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener("visibilitychange", visibilityChange);
        };
    }, []);

    return inFocus;
};
