import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:5000/api/", // Local Backend base URL
    baseURL: "https://captico-assignment-api.vercel.app/api", // Live Backend base URL
});

// Add a token to each request if available
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
        req.headers.Authorization = `Bearer ${token}`; // Attach token to request headers
    }
    return req;
});

export default API;
