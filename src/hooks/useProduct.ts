'use client';

// src/hooks/useProduct.ts

import { useEffect, useState } from 'react';
import { getProductBySlug } from '../services/woo/products';
import { Product } from '../types/product';

const useProduct = (slug: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await getProductBySlug(slug);
                setProduct(data);
            } catch (err) {
                setError('Error fetching product data');
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [slug]);

    return { product, loading, error };
};

export default useProduct;