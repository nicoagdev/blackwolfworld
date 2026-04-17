import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  slug?: string;
  title: string;
  price: string;
  imageUrl: string;
  onAddToCart: (id: number) => void;
  category?: string;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  title,
  price,
  imageUrl,
  onAddToCart,
  category,
  isNew = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <div className="relative bg-bw-dark rounded-apple-lg overflow-hidden border border-white/5 hover:border-bw-gold/15 transition-all duration-500 ease-apple">
        {isNew && (
          <span className="absolute top-4 left-4 z-10 font-display font-semibold text-[0.65rem] tracking-[0.15em] uppercase bg-bw-gold text-bw-black px-3 py-1.5 rounded-lg">
            Nuevo
          </span>
        )}

        {/* Image */}
        <Link href={slug ? `/products/${slug}` : `/products`}>
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-apple group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bw-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </Link>

        {/* Info */}
        <div className="p-5">
          {category && (
            <p className="font-display text-[0.7rem] tracking-[0.15em] uppercase text-bw-gold/70 mb-2">
              {category}
            </p>
          )}
          <Link href={slug ? `/products/${slug}` : `/products`}>
            <h3 className="font-display font-bold text-base uppercase tracking-wide text-bw-cream group-hover:text-bw-gold transition-colors duration-300 mb-1">
              {title}
            </h3>
          </Link>
          <div className="flex items-center justify-between mt-3">
            <span className="font-serif text-lg text-bw-gold">
              ${parseFloat(price.replace('$', '').replace(',', '')).toLocaleString()}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(id); }}
              className="flex items-center gap-2 font-display font-semibold text-[0.7rem] tracking-[0.12em] uppercase text-bw-muted border border-white/10 px-4 py-2.5 rounded-xl hover:text-bw-black hover:bg-bw-gold hover:border-bw-gold transition-all duration-300 active:scale-[0.96]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;