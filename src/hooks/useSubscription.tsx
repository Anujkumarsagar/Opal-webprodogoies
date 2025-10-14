import { useState } from "react";
import axios from 'axios';

export const useSubscription = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const onSubscribe = async () => {
        setIsProcessing(true);
        try {
            const response = await axios.get("/api/payment");

            if (response.data.status === 200 && response.data.url) {
                window.location.href = response.data.url;
                // No need to set isProcessing to false here, as the page will redirect.
            } else {
                console.error("Failed to create subscription:", response.data.message);
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Error during subscription process:", error);
            setIsProcessing(false);
        }
    };

    return { onSubscribe, isProcessing };
};