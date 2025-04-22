import { useMemo } from "react";

const useAppUrl = () => {
    // Online/Offline Configuration
    // const appUrl = "http://localhost:8000";
    const appUrl = "https://kensqui.eskey22.com";

    // Determine the correct URL to use
    const API_URL = useMemo(() => {
        return appUrl;
    }, []);

    return API_URL;
};

export default useAppUrl;
