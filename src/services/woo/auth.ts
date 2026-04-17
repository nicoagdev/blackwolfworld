// src/services/woo/auth.ts

import axios from 'axios';

const API_URL = process.env.WP_API_URL || 'https://app.blackwolfworld.com/wp-json/wc/v3';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/customers/token`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error((error as any)?.response?.data?.message || 'Login failed');
    }
};

export const register = async (data: { username: string; email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/customers`, data);
        return response.data;
    } catch (error) {
        throw new Error((error as any)?.response?.data?.message || 'Registration failed');
    }
};

export const logout = async () => {
    // Implement logout functionality if needed
    // This could involve clearing tokens or session data
};