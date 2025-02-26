import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
    state: {
        user: null,
        token: localStorage.getItem('token') || null,
        clothingItems: [],
        categories: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearAuth(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        setClothingItems(state, items) {
            state.clothingItems = items;
        },
        setCategories(state, categories) {
            state.categories = categories;
        }
    },
    actions: {
        async register({ commit }, userData) {
            const response = await api.register(userData);
            commit('setToken', response.data.token);
            commit('setUser', response.data.user);
            return response;
        },
        async login({ commit }, credentials) {
            const response = await api.login(credentials);
            commit('setToken', response.data.token);
            commit('setUser', response.data.user);
            return response;
        },
        async logout({ commit }) {
            await api.logout();
            commit('clearAuth');
        },
        async fetchUser({ commit }) {
            const response = await api.getUser();
            commit('setUser', response.data);
            return response;
        },
        async fetchClothingItems({ commit }) {
            const response = await api.getClothingItems();
            commit('setClothingItems', response.data);
            return response;
        },
        async fetchCategories({ commit }) {
            const response = await api.getCategories();
            commit('setCategories', response.data);
            return response;
        }
    }
}); 