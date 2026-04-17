'use client';

import { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../services/woo/products';
import { Product } from '../types/product';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err: any) {
      const msg = err?.response?.data?.detail?.message || 'Error al cargar productos. Intenta nuevamente.';
      setError(msg);
      console.error('Error fetching products:', err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.categories.some(cat =>
        cat.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredProducts(filtered);
  }, [products]);

  const getProductById = useCallback((id: number) => {
    return products.find(product => product.id === id);
  }, [products]);

  const getProductsByCategory = useCallback((categorySlug: string) => {
    return products.filter(product =>
      product.categories.some(cat => cat.slug === categorySlug)
    );
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products: filteredProducts,
    allProducts: products,
    loading,
    error,
    searchQuery,
    searchProducts,
    getProductById,
    getProductsByCategory,
    refetch: fetchProducts
  };
};

export default useProducts;