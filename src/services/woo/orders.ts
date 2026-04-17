// src/services/woo/orders.ts

import axios from 'axios';
import { Order } from '../../types/order';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export const fetchOrders = async (customerId: number): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_URL}/wp-json/wc/v3/orders?customer=${customerId}`, {
            params: {
                consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
                consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const fetchOrderById = async (orderId: number): Promise<Order> => {
    const response = await axios.get(`${API_URL}/wp-json/wc/v3/orders/${orderId}`, {
        params: {
            consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
            consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
        }
    });
    return response.data;
};

export const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const response = await axios.post(`${API_URL}/wp-json/wc/v3/orders`, orderData, {
        params: {
            consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
            consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
        }
    });
    return response.data;
};

export const updateOrder = async (orderId: number, orderData: Partial<Order>): Promise<Order> => {
    const response = await axios.put(`${API_URL}/wp-json/wc/v3/orders/${orderId}`, orderData, {
        params: {
            consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
            consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
        }
    });
    return response.data;
};

export const deleteOrder = async (orderId: number): Promise<void> => {
    await axios.delete(`${API_URL}/wp-json/wc/v3/orders/${orderId}`, {
        params: {
            consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
            consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
        }
    });
};