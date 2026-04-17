import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck } from 'lucide-react';
import useCart from '../../hooks/useCart';
import Link from 'next/link';

const CartSummary = () => {
  const { cartItems, totalAmount } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + shipping;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bw-dark rounded-apple-xl p-6 border border-white/5"
    >
      <h2 className="font-display font-bold text-lg uppercase tracking-wide text-bw-cream mb-6">
        Resumen
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between font-body text-sm">
          <span className="text-bw-muted">Subtotal</span>
          <span className="text-bw-cream">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-bw-muted">Envío</span>
          <span className="flex items-center gap-1.5">
            {shipping === 0 ? (
              <>
                <Truck className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Gratis</span>
              </>
            ) : (
              <span className="text-bw-cream">${shipping.toLocaleString()}</span>
            )}
          </span>
        </div>
        <div className="border-t border-white/5 pt-4 flex justify-between">
          <span className="font-display font-bold uppercase tracking-wide text-bw-cream">Total</span>
          <span className="font-serif text-xl text-bw-gold">${total.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Link href="/checkout" className="block">
          <button className="w-full flex items-center justify-center gap-2 font-display font-bold text-sm tracking-widest uppercase bg-bw-gold text-bw-black py-4 rounded-xl hover:bg-bw-gold-light transition-all duration-300 active:scale-[0.98] shadow-lg shadow-bw-gold/20">
            <CreditCard className="w-4 h-4" />
            Proceder al pago
          </button>
        </Link>
        <Link href="/products" className="block">
          <button className="w-full font-display font-semibold text-sm tracking-widest uppercase text-bw-muted border border-white/10 py-3.5 rounded-xl hover:text-bw-cream hover:border-bw-gold/30 transition-all duration-300">
            Seguir comprando
          </button>
        </Link>
      </div>

      {subtotal < 50000 && subtotal > 0 && (
        <p className="font-body text-xs text-bw-muted/60 mt-4 text-center">
          Agregá ${(50000 - subtotal).toLocaleString()} más para envío gratis
        </p>
      )}
    </motion.div>
  );
};

export default CartSummary;