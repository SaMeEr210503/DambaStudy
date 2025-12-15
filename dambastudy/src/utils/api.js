import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
});

function getToken() {
    try {
        return localStorage.getItem('damba_token');
    } catch {
        return null;
    }
}

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            try { localStorage.removeItem('damba_token'); } catch { /* empty */ }
            const current = window.location.pathname + window.location.search;
            window.location.href = `/login?from=${encodeURIComponent(current)}`;
        }
        return Promise.reject(error);
    }
);

export default api;
