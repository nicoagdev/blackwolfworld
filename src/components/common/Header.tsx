'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react';
import useCart from '@/hooks/useCart';
import useProducts from '@/hooks/useProducts';
import { getAvailableCategories } from '@/utils/productCategories';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { cartItems } = useCart();
  const { allProducts } = useProducts();
  const categoriesMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!categoriesMenuRef.current?.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'El Manifiesto', href: '/manifiesto' },
    { label: 'La Manada', href: '/la-manada' },
    { label: 'Tienda', href: '/products' },
    { label: 'Blog', href: '/blog' },
  ];

  const categories = useMemo(() => getAvailableCategories(allProducts), [allProducts]);

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

          <Link
            href="/contacto"
            className="font-display font-normal text-[0.82rem] tracking-[0.14em] uppercase text-bw-warm/70 hover:text-bw-gold transition-colors duration-300"
          >
            Contacto
          </Link>

          <Link href="/cart" className="relative ml-2">
            <ShoppingBag className="w-5 h-5 text-bw-warm/70 hover:text-bw-gold transition-colors duration-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-bw-gold text-bw-black text-[0.6rem] font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          <div className="relative" ref={categoriesMenuRef}>
            <button
              type="button"
              onClick={() => setCategoriesOpen((currentValue) => !currentValue)}
              className="inline-flex items-center gap-2 font-display font-semibold text-[0.82rem] tracking-[0.12em] uppercase bg-bw-gold text-bw-black px-5 py-2.5 rounded-lg hover:bg-bw-gold-light transition-all duration-300 active:scale-[0.98]"
            >
              Explorar
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${categoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {categoriesOpen && (
              <div className="absolute right-0 top-full mt-3 w-64 rounded-apple-xl border border-white/10 bg-bw-dark shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="font-display text-[0.7rem] uppercase tracking-[0.18em] text-bw-gold">
                    Categorias
                  </p>
                </div>
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products?category=${category.slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="block px-4 py-3 font-body text-sm text-bw-warm/75 hover:bg-white/[0.03] hover:text-bw-cream transition-colors duration-300"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
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
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="font-display font-bold text-2xl uppercase tracking-wide text-bw-cream hover:text-bw-gold transition-colors"
            >
              Contacto
            </Link>
            <div className="pt-4 border-t border-white/10">
              <p className="font-display text-xs uppercase tracking-[0.18em] text-bw-gold mb-4">
                Categorias
              </p>
              <div className="flex flex-col gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/products?category=${category.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-base text-bw-warm/75 hover:text-bw-cream transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
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
          </div>
        </motion.div>
      )}
    </>
  );
}