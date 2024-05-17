let backendHost;
const hostname = typeof window !== 'undefined' && window.location && window.location.hostname;

// if (hostname === "localhost") {
//     backendHost = "https://localhost:8080";
// }
backendHost = process.env.NEXT_PUBLIC_BACK_BASE_URL

export const API_BASE_URL = `${backendHost}`;