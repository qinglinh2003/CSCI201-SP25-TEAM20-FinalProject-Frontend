import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});


// Automatically adds Authorization header with Bearer token from localStorage for authenticated requests.
api.interceptors.request.use((config) => {
    const token = localStorage.token;
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;
