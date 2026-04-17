'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CartItem from '@/components/ecom/CartItem';
import CartSummary from '@/components/ecom/CartSummary';
import useCart from '@/hooks/useCart';

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-12"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.15em] text-bw-muted hover:text-bw-cream transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver
          </Link>
        </div>
        <h1 className="font-display font-bold text-2xl uppercase tracking-wide">
          Carrito
        </h1>
        {cartItems.length > 0 && (
          <span className="font-display text-xs uppercase tracking-widest text-bw-gold">
            {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''}
          </span>
        )}
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-28"
        >
          <ShoppingBag className="w-16 h-16 text-bw-muted/30 mx-auto mb-6" />
          <h2 className="font-display font-bold text-xl uppercase tracking-wide mb-3">
            Tu carrito está vacío
          </h2>
          <p className="font-body text-sm text-bw-muted mb-10">
            Explorá nuestra colección y encontrá tu próximo favorito.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-bw-gold text-bw-black font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-gold-light transition-colors duration-300"
          >
            Explorar productos
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <CartSummary />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default CartPage;