'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import useProducts from '@/hooks/useProducts';
import { getAvailableCategories } from '@/utils/productCategories';

export default function Footer() {
  const { allProducts } = useProducts();
  const categories = useMemo(() => getAvailableCategories(allProducts), [allProducts]);

  const companyLinks = [
    { label: 'El Manifiesto', href: '/manifiesto' },
    { label: 'La Manada', href: '/la-manada' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tienda', href: '/products' },
  ];

  const supportLinks = [
    { label: 'FAQ', href: '/faq' },
    { label: 'Contacto', href: '/contacto', external: false },
  ];

  return (
    <footer className="bg-bw-black border-t border-bw-gold/8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12 pb-12 border-b border-white/5">
          <div className="md:col-span-2">
            <img
              src="/logos/Logo-Blackwolf-Light.png"
              alt="BlackWolf"
              className="h-8 md:h-10 w-auto object-contain mb-5"
            />
            <p className="font-body text-sm text-bw-muted max-w-sm leading-relaxed">
              BlackWolf crea equipamiento para humanos y mascotas con una misma lógica: resistencia real, diseño funcional y una identidad de manada.
            </p>
            <div className="mt-6 space-y-2 font-body text-sm text-bw-muted">
              <p>Villa Gesell</p>
              <a
                href="mailto:hola@blackwolfworld.com"
                className="block hover:text-bw-cream transition-colors duration-300"
              >
                hola@blackwolfworld.com
              </a>
              <a
                href="http://wa.me/5492255421676"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-bw-cream transition-colors duration-300"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com/blackwolf_world"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-bw-cream transition-colors duration-300"
              >
                @blackwolf_world
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-display font-semibold text-[0.7rem] uppercase tracking-[0.18em] text-bw-gold mb-4">
              Tienda
            </h5>
            <ul className="flex flex-col gap-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="font-body text-sm text-bw-muted hover:text-bw-cream transition-colors duration-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-display font-semibold text-[0.7rem] uppercase tracking-[0.18em] text-bw-gold mb-4">
              Empresa
            </h5>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-bw-muted hover:text-bw-cream transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-display font-semibold text-[0.7rem] uppercase tracking-[0.18em] text-bw-gold mb-4">
              Soporte
            </h5>
            <ul className="flex flex-col gap-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="font-body text-sm text-bw-muted hover:text-bw-cream transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-body text-sm text-bw-muted hover:text-bw-cream transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-bw-muted/60">
            © {new Date().getFullYear()} BlackWolf World. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-bw-muted/60">
            Villa Gesell, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}