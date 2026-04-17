// src/services/woo/products.ts

import axios from 'axios';
import { Product } from '../../types/product';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get('/api/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
    try {
        const response = await axios.get(`/api/products?slug=${slug}`);
        return response.data[0]; // Assuming the slug is unique and returns one product
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}; 

export const createProduct = async (productData: Product): Promise<Product> => {
    try {
        const response = await axios.post(`${API_URL}/wp-json/wc/v3/products`, productData, {
            params: {
                consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
                consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (productId: number, productData: Product): Promise<Product> => {
    try {
        const response = await axios.put(`${API_URL}/wp-json/wc/v3/products/${productId}`, productData, {
            params: {
                consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
                consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${productId}:`, error);
        throw error;
    }
};

export const deleteProduct = async (productId: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/wp-json/wc/v3/products/${productId}`, {
            params: {
                consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
                consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
            }
        });
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        throw error;
    }
};