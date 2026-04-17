// File: /blackwolf-next-ecommerce/blackwolf-next-ecommerce/src/services/woo/customers.ts

import axios from 'axios';
import { User } from '../../types/user';

const API_URL = process.env.WORDPRESS_API_URL;

export const getCustomers = async (): Promise<User[]> => {
    try {
        const response = await axios.get(`${API_URL}/wp-json/wc/v3/customers`, {
            headers: {
                'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

export const getCustomerById = async (id: number): Promise<User> => {
    try {
        const response = await axios.get(`${API_URL}/wp-json/wc/v3/customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching customer with ID ${id}:`, error);
        throw error;
    }
};

export const createCustomer = async (customerData: User): Promise<User> => {
    try {
        const response = await axios.post(`${API_URL}/wp-json/wc/v3/customers`, customerData, {
            headers: {
                'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

export const updateCustomer = async (id: number, customerData: Partial<User>): Promise<User> => {
    try {
        const response = await axios.put(`${API_URL}/wp-json/wc/v3/customers/${id}`, customerData, {
            headers: {
                'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating customer with ID ${id}:`, error);
        throw error;
    }
};

export const deleteCustomer = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/wp-json/wc/v3/customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`
            }
        });
    } catch (error) {
        console.error(`Error deleting customer with ID ${id}:`, error);
        throw error;
    }
};