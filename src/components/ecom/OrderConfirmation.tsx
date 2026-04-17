'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-bw-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-bw-gold/10 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-10 h-10 text-bw-gold" />
        </motion.div>

        <h1 className="font-display font-black italic text-display uppercase text-bw-cream mb-4">
          ¡Gracias!
        </h1>
        <p className="font-body text-body-lg text-bw-muted mb-2">
          Tu pedido fue realizado con éxito.
        </p>
        {orderId && (
          <p className="font-display text-sm tracking-widest uppercase text-bw-gold mb-8">
            Pedido #{orderId}
          </p>
        )}
        <p className="font-body text-sm text-bw-muted/60 mb-10">
          Vas a recibir un email de confirmación con los detalles del envío.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/orders">
            <button className="w-full font-display font-bold text-sm tracking-widest uppercase bg-bw-gold text-bw-black py-4 rounded-xl hover:bg-bw-gold-light transition-all duration-300 active:scale-[0.98]">
              Ver mis pedidos
            </button>
          </Link>
          <Link href="/products">
            <button className="w-full flex items-center justify-center gap-2 font-display font-semibold text-sm tracking-widest uppercase text-bw-muted border border-white/10 py-3.5 rounded-xl hover:text-bw-cream hover:border-bw-gold/30 transition-all duration-300">
              Seguir explorando
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;