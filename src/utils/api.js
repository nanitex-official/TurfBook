import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Bookings API
export const bookingsAPI = {
    getAll: () => api.get('/bookings'),
    create: (data) => api.post('/bookings', data),
    update: (id, data) => api.put(`/bookings/${id}`, data),
    delete: (id) => api.delete(`/bookings/${id}`),
    checkAvailability: (date, time) => api.get('/bookings/check-availability', { params: { date, time } }),
};

// Pricing API
export const pricingAPI = {
    getAll: () => api.get('/pricing'),
    create: (data) => api.post('/pricing', data),
    update: (id, data) => api.put(`/pricing/${id}`, data),
    delete: (id) => api.delete(`/pricing/${id}`),
};

// Turf Details API
export const turfAPI = {
    get: () => api.get('/turf'),
    update: (data) => api.put('/turf', data),
};

// Utility API
export const utilityAPI = {
    health: () => api.get('/health'),
    seed: () => api.post('/seed'),
};

export default api;
