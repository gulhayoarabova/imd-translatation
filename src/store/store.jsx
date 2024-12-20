/** @format */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAuthToken } from '../api/api.instance';
import CryptoJS from 'crypto-js';
import { instance } from '../api/api.instance.js';

const SECRET_KEY = 'your-secret-key';
const secureStorage = {
    setItem: (key, value) => {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
        localStorage.setItem(key, encrypted);
    },
    getItem: (key) => {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;

        try {
            const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted);
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
};

const useStore = create(
    persist(
        (set, get) => ({
            selectedLanguage: 'en',
            superuser: false,
            token: null,
            user: null,
            userStatus: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
            userError: null,

            setLanguage: (language) => set({ selectedLanguage: language }),
            setSuperuser: (value) => set({ superuser: value }),
            setToken: (value) => {
                if (value === null) {
                    secureStorage.removeItem('token'); // Remove token securely
                    setAuthToken(null);
                } else {
                    secureStorage.setItem('token', value); // Store token securely
                    setAuthToken(value);
                }
                set({ token: value });
            },

            fetchUser: async () => {
                set({ userStatus: 'loading', userError: null });
                try {
                    const response = await instance.get('/auth/check_token');
                    set({ user: response.data, userStatus: 'succeeded' });
                } catch (error) {
                    set({
                        userStatus: 'failed',
                        userError: error.message || 'Failed to fetch user',
                    });
                }
            },
        }),
        {
            name: 'app-storage', // Key in localStorage
            storage: secureStorage, // Use
        }
    )
);

export default useStore;
