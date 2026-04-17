import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const BrandSection: React.FC = () => {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display font-black italic text-[20vw] uppercase text-bw-gold/[0.03] whitespace-nowrap tracking-tight">
          BLACKWOLF
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <p className="font-display text-overline uppercase tracking-[0.22em] text-bw-gold mb-6 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-bw-gold" />
            Nuestra esencia
            <span className="w-8 h-px bg-bw-gold" />
          </p>

          <h2 className="font-display font-black italic text-display-xl uppercase text-bw-cream mb-8">
            Built for<br />
            <span className="text-bw-gold">movement</span>
          </h2>

          <p className="font-serif italic text-body-lg text-bw-muted max-w-lg mx-auto mb-12 leading-relaxed">
            BlackWolf diseña herramientas para la vida diaria. Movimiento, adaptación y evolución constante en cada producto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="font-display font-bold text-sm tracking-widest uppercase bg-bw-gold text-bw-black px-8 py-4 rounded-xl hover:bg-bw-gold-light transition-all duration-300 active:scale-[0.98]"
            >
              Explorar colección
            </Link>
            <Link
              href="#"
              className="font-display font-normal text-sm tracking-widest uppercase text-bw-warm border-b border-bw-gold/30 pb-0.5 hover:text-bw-gold hover:border-bw-gold transition-all duration-300"
            >
              Nuestra historia →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandSection;