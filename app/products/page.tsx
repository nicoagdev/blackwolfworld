'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductList from '@/components/ecom/ProductList';
import SearchBar from '@/components/common/SearchBar';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getProducts } from '@/services/woo/products';
import { Product } from '@/types/product';
import { getAvailableCategories } from '@/utils/productCategories';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const categories = useMemo(() => getAvailableCategories(products), [products]);

  const filtered = useMemo(() => {
    const categoryScopedProducts = activeCategory
      ? products.filter((product) =>
          product.categories.some((category) => category.slug === activeCategory)
        )
      : products;

    if (!searchQuery.trim()) {
      return categoryScopedProducts;
    }

    const normalizedQuery = searchQuery.toLowerCase();

    return categoryScopedProducts.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.categories.some((category) => category.name.toLowerCase().includes(normalizedQuery))
    );
  }, [activeCategory, products, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const activeCategoryLabel = categories.find((category) => category.slug === activeCategory)?.name;

  return (
    <div className="min-h-screen bg-bw-black text-bw-cream">
      <Header />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-gold mb-3">
              {activeCategoryLabel ? `Categoria: ${activeCategoryLabel}` : 'Colección'}
            </span>
            <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tracking-tight">
              {activeCategoryLabel ? activeCategoryLabel : 'Todos los productos'}
            </h1>
          </div>
          <div className="w-full md:w-80">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-28">
            <div className="w-8 h-8 border-2 border-bw-gold/20 border-t-bw-gold rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="font-body text-sm text-red-400 text-center py-20">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="font-body text-sm text-bw-muted text-center py-20">No se encontraron productos.</p>
        ) : (
          <ProductList products={filtered} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;