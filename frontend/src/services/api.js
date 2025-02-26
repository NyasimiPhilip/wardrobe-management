import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    // Auth endpoints
    register(userData) {
        return api.post('/register', userData);
    },
    login(credentials) {
        return api.post('/login', credentials);
    },
    logout() {
        return api.post('/logout');
    },

    // Protected endpoints
    getUser() {
        return api.get('/user');
    },

    // Clothing items
    getClothingItems() {
        return api.get('/clothing-items');
    },
    createClothingItem(data) {
        return api.post('/clothing-items', data);
    },
    updateClothingItem(id, data) {
        return api.put(`/clothing-items/${id}`, data);
    },
    deleteClothingItem(id) {
        return api.delete(`/clothing-items/${id}`);
    },

    // Categories
    getCategories() {
        return api.get('/categories');
    },
    createCategory(data) {
        return api.post('/categories', data);
    },
    updateCategory(id, data) {
        return api.put(`/categories/${id}`, data);
    },
    deleteCategory(id) {
        return api.delete(`/categories/${id}`);
    }
}; 