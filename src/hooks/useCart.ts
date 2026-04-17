'use client';

import { useState, useEffect } from 'react';
import { CartItemType } from '../types/product'; // Adjust the import based on your actual cart item type

const useCart = () => {
    const [cart, setCart] = useState<CartItemType[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    const addToCart = (item: CartItemType) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, item];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (itemId: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const savedCart = localStorage.getItem('cart');
            setCart(savedCart ? JSON.parse(savedCart) : []);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price) * (item.quantity || 1), 0);

    return {
        cartItems: cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
    };
};

export default useCart;