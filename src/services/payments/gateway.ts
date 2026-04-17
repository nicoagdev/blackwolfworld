// File: /blackwolf-next-ecommerce/blackwolf-next-ecommerce/src/services/payments/gateway.ts

import axios from 'axios';

const API_URL = process.env.WC_API_URL; // WooCommerce API URL
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY; // WooCommerce Consumer Key
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET; // WooCommerce Consumer Secret

// Function to initiate a payment
export const initiatePayment = async (paymentData: any) => {
    try {
        const response = await axios.post(`${API_URL || ''}/payments`, paymentData, {
            auth: {
                username: CONSUMER_KEY || '',
                password: CONSUMER_SECRET || '',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error initiating payment:', error);
        throw error;
    }
};

// Function to handle payment confirmation
export const confirmPayment = async (paymentId: any) => {
    try {
        const response = await axios.get(`${API_URL || ''}/payments/${paymentId}`, {
            auth: {
                username: CONSUMER_KEY || '',
                password: CONSUMER_SECRET || '',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error confirming payment:', error);
        throw error;
    }
};

// Function to handle payment cancellation
export const cancelPayment = async (paymentId: any) => {
    try {
        const response = await axios.delete(`${API_URL || ''}/payments/${paymentId}`, {
            auth: {
                username: CONSUMER_KEY || '',
                password: CONSUMER_SECRET || '',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error cancelling payment:', error);
        throw error;
    }
};