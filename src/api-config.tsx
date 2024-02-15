let backendHost;
const hostname = typeof window !== 'undefined' && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "https://localhost:8080";
}

export const API_BASE_URL = `${backendHost}`;