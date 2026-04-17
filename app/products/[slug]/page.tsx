'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductBySlug } from '@/services/woo/products';
import ProductDetails from '@/components/ecom/ProductDetails';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Product } from '@/types/product';

const ProductPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        try {
          const data = await getProductBySlug(slug);
          setProduct(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [slug]);

  return (
    <div className="min-h-screen bg-bw-black text-bw-cream">
      <Header />
      <div className="pt-24 pb-20">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-2 border-bw-gold/20 border-t-bw-gold rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="font-body text-sm text-red-400 text-center py-20">{error}</p>
        ) : !product ? (
          <p className="font-body text-sm text-bw-muted text-center py-20">Producto no encontrado.</p>
        ) : (
          <ProductDetails product={product} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;