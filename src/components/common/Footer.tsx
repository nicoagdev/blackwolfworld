'use client';

import Link from 'next/link';

export default function Footer() {
  const columns = [
    {
      title: 'Tienda',
      links: [
        { label: 'Novedades', href: '/products' },
        { label: 'GPS & Tracking', href: '/products' },
        { label: 'Collares', href: '/products' },
        { label: 'Mochilas', href: '/products' },
        { label: 'Kits', href: '/products' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Nosotros', href: '#' },
        { label: 'Tecnología', href: '#' },
        { label: 'Comunidad', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { label: 'Envíos', href: '#' },
        { label: 'Devoluciones', href: '#' },
        { label: 'Garantía', href: '#' },
        { label: 'Contacto', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-bw-black border-t border-bw-gold/8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 pb-16 border-b border-white/5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/logos/Logo-Blackwolf-Light.png"
              alt="BlackWolf"
              className="h-10 w-auto object-contain mb-5"
            />
            <p className="font-body text-body text-bw-muted max-w-xs leading-relaxed">
              Equipamiento técnico premium para humanos y mascotas. Diseñado para moverse distinto.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="font-display font-semibold text-overline uppercase tracking-[0.18em] text-bw-gold mb-5">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-caption text-bw-muted hover:text-bw-cream transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-bw-muted/60">
            © {new Date().getFullYear()} BlackWolf World. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-bw-muted/60">
            Buenos Aires, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}