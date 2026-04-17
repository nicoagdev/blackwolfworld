'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, Shield, RotateCcw, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Product } from '../../types/product';
import useCart from '../../hooks/useCart';

const ProductDetails = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const features = [
    { icon: Truck, label: 'Envío gratis +$50.000' },
    { icon: Shield, label: 'Garantía 2 años' },
    { icon: RotateCcw, label: 'Devolución 30 días' },
  ];

  return (
    <div className="min-h-screen bg-bw-black">
      {/* Back navigation */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 pb-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-display text-xs tracking-widest uppercase text-bw-muted hover:text-bw-gold transition-colors duration-300"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a productos
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative overflow-hidden rounded-apple-xl aspect-square bg-bw-dark border border-white/5">
              <img
                src={product.images[selectedImage]?.src || ''}
                alt={product.images[selectedImage]?.alt || product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? 'border-bw-gold'
                        : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col justify-center"
          >
            {product.categories[0] && (
              <p className="font-display text-overline uppercase tracking-[0.22em] text-bw-gold mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-bw-gold" />
                {product.categories[0].name}
              </p>
            )}

            <h1 className="font-display font-black italic text-display-lg uppercase text-bw-cream mb-6">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-serif text-3xl text-bw-gold">
                ${parseFloat(product.price).toLocaleString()}
              </span>
              {product.sale_price && product.regular_price !== product.sale_price && (
                <span className="font-body text-lg text-bw-muted line-through">
                  ${parseFloat(product.regular_price).toLocaleString()}
                </span>
              )}
            </div>

            <div
              className="font-body text-body text-bw-muted leading-relaxed mb-8 [&>p]:mb-3"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Quantity & Add to cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-bw-muted hover:text-bw-cream hover:bg-white/5 transition-all duration-300 font-display"
                >
                  −
                </button>
                <span className="px-5 py-3 font-display font-semibold text-bw-cream border-x border-white/10 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-bw-muted hover:text-bw-cream hover:bg-white/5 transition-all duration-300 font-display"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 font-display font-bold text-sm tracking-widest uppercase bg-bw-gold text-bw-black px-8 py-4 rounded-xl hover:bg-bw-gold-light transition-all duration-300 active:scale-[0.98] shadow-lg shadow-bw-gold/20"
              >
                <ShoppingBag className="w-5 h-5" />
                Agregar al carrito
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center"
                >
                  <Icon className="w-5 h-5 text-bw-gold/70" />
                  <span className="font-body text-[0.7rem] text-bw-muted leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;