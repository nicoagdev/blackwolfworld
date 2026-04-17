'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import useCart from '@/hooks/useCart';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tienda', href: '/products' },
    { label: 'Colecciones', href: '/products' },
    { label: 'Tecnología', href: '#' },
    { label: 'Nosotros', href: '#' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-500 ${
          scrolled
            ? 'bg-bw-black/80 backdrop-blur-xl border-b border-bw-gold/10'
            : 'bg-transparent'
        }`}
      >
        <Link href="/">
          <img
            src="/logos/Logo-Blackwolf-Light.png"
            alt="BlackWolf"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-display font-normal text-[0.82rem] tracking-[0.14em] uppercase text-bw-warm/70 hover:text-bw-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          <Link href="/cart" className="relative ml-2">
            <ShoppingBag className="w-5 h-5 text-bw-warm/70 hover:text-bw-gold transition-colors duration-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-bw-gold text-bw-black text-[0.6rem] font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link
            href="/products"
            className="font-display font-semibold text-[0.82rem] tracking-[0.12em] uppercase bg-bw-gold text-bw-black px-5 py-2.5 rounded-lg hover:bg-bw-gold-light transition-all duration-300 active:scale-[0.98]"
          >
            Explorar
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-bw-warm"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-bw-black/95 backdrop-blur-xl pt-24 px-8"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display font-bold text-2xl uppercase tracking-wide text-bw-cream hover:text-bw-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="font-display font-bold text-2xl uppercase tracking-wide text-bw-cream hover:text-bw-gold transition-colors flex items-center gap-3"
            >
              Carrito
              {cartItems.length > 0 && (
                <span className="bg-bw-gold text-bw-black text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="mt-4 font-display font-bold text-sm tracking-widest uppercase bg-bw-gold text-bw-black px-6 py-4 rounded-xl text-center"
            >
              Explorar Colección
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}