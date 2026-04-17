import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItemType } from '../../types/product';
import useCart from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-5 p-4 bg-white/[0.02] rounded-apple border border-white/5 hover:border-bw-gold/10 transition-all duration-300"
    >
      <img
        src={item.images[0]?.src || '/imagenes/placeholder.jpg'}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-sm uppercase tracking-wide text-bw-cream truncate">
          {item.name}
        </h3>
        <p className="font-serif text-bw-gold mt-1">
          ${parseFloat(item.price).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
        <button
          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          className="p-2 text-bw-muted hover:text-bw-cream hover:bg-white/5 transition-all duration-300"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="px-3 font-display font-semibold text-sm text-bw-cream border-x border-white/10">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-2 text-bw-muted hover:text-bw-cream hover:bg-white/5 transition-all duration-300"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 rounded-xl text-bw-muted hover:text-red-400 hover:bg-red-400/5 transition-all duration-300"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default CartItem;