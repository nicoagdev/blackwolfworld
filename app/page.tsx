'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowRight, Shield, Radio, Eye, ChevronRight } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import useProducts from '@/hooks/useProducts';
import useCart from '@/hooks/useCart';
import { Product } from '@/types/product';

/* ── Helpers ─────────────────────────────────────────── */

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-gold mb-4">
      {children}
    </span>
  );
}

/* ── Data ────────────────────────────────────────────── */

const features = [
  {
    num: '01',
    icon: Shield,
    title: 'Calidad sin jerarquías',
    desc: 'Utilizamos exactamente las mismas telas de alto rendimiento y herrajes tanto para una bandolera como para un pretal. Tu compañero merece la misma durabilidad y diseño que vos.',
  },
  {
    num: '02',
    icon: Radio,
    title: 'Testeado en el terreno',
    desc: 'Nada de pruebas de laboratorio simuladas. Cada diseño rinde bajo presión extrema porque lo probamos donde más se desgasta: sol implacable, arena, agua y uso intensivo diario.',
  },
  {
    num: '03',
    icon: Eye,
    title: 'Precisión de taller',
    desc: 'Detrás de cada pieza hay moldería exacta, corte meticuloso y costuras reforzadas hechas por nuestro propio equipo. Un proceso controlado de principio a fin para garantizar que cada producto sea impecable.',
  },
];



const testimonials = [
  {
    quote: 'Compré la riñonera para mí y terminé pidiendo el pretal a la semana. Es increíble ver que usan los mismos materiales técnicos para ambos. Se bancan la arena, el sol de la playa y siguen intactos.',
    initials: 'LM',
    name: 'Lucas M.',
    role: 'Surfista y dueño de un Border Collie',
  },
  {
    quote: 'Se nota que no es un producto industrial más. La confección, las costuras... tienen una calidad tremenda. Siento la seguridad total cuando salimos a caminar, y estéticamente nos vemos impecables.',
    initials: 'SF',
    name: 'Sofía F.',
    role: 'Fotógrafa urbana',
  },
];

const bandItems = [
  'Envío gratis +$50.000',
  'Garantía 2 años',
  'Devolución 30 días',
  'GPS integrado',
  'Tecnología premium',
];

const featuredFilters = ['Todo', 'Movimiento', 'Hábitat', 'Esenciales'] as const;
type FeaturedFilter = typeof featuredFilters[number];

const featuredFilterTaxonomy: Record<Exclude<FeaturedFilter, 'Todo'>, { slugs: string[]; names: string[] }> = {
  Movimiento: {
    slugs: ['arneses', 'pretales', 'collares', 'correas', 'bandoleras', 'rinoneras', 'chest-rigs'],
    names: ['Arneses', 'Pretales', 'Collares', 'Correas', 'Bandoleras', 'Riñoneras', 'Chest Rigs'],
  },
  Hábitat: {
    slugs: ['camas', 'descanso', 'hogar', 'outdoor', 'playa'],
    names: ['Camas', 'Descanso', 'Hogar', 'Outdoor', 'Playa'],
  },
  Esenciales: {
    slugs: ['kits', 'esenciales', 'mochilas', 'bolsos', 'neceseres', 'accesorios'],
    names: ['Kits', 'Esenciales', 'Mochilas', 'Bolsos', 'Neceseres', 'Accesorios'],
  },
};

const normalizeText = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const matchesFeaturedFilter = (product: Product, filterName: FeaturedFilter): boolean => {
  if (filterName === 'Todo') {
    return true;
  }

  const taxonomy = featuredFilterTaxonomy[filterName];

  return product.categories.some((category) => {
    const categorySlug = normalizeText(category.slug);
    const categoryName = normalizeText(category.name);

    return (
      taxonomy.slugs.some((slug) => normalizeText(slug) === categorySlug) ||
      taxonomy.names.some((name) => normalizeText(name) === categoryName)
    );
  });
};

/* ── Page ────────────────────────────────────────────── */

export default function HomePage() {

  const { allProducts, loading: productsLoading, error: productsError } = useProducts();
  const { addToCart } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [activeFeaturedFilter, setActiveFeaturedFilter] = useState<FeaturedFilter>('Todo');

  const featuredProducts = useMemo(() => {
    const filteredProducts = allProducts.filter((product) => matchesFeaturedFilter(product, activeFeaturedFilter));
    return filteredProducts.slice(0, 4);
  }, [activeFeaturedFilter, allProducts]);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = newsletterEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setNewsletterStatus('error');
      setNewsletterMessage('Ingresá un email válido.');
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'newsletter',
          data: {
            email: trimmedEmail,
            source: 'home_newsletter',
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'No se pudo enviar el formulario.');
      }

      setNewsletterStatus('success');
      setNewsletterMessage('Suscripción realizada. Revisa tu correo.');
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage(error instanceof Error ? error.message : 'Error enviando el formulario.');
    }
  };

  return (
    <main className="bg-bw-black text-bw-cream overflow-x-hidden">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative h-svh min-h-[580px] md:min-h-[680px] flex items-end">
        {/* Background */}
        <div className="absolute inset-0 -z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1589557933842-a32866d4ec23?w=800&q=70"
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/36746540/15573192_1920_1080_50fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-bw-black via-bw-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bw-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-28"
        >
          <div
            className="max-w-xl"
          >
            <SectionLabel>Nueva Colección 2026</SectionLabel>

            <h1 className="font-display font-bold text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight mt-2">
              UNA SOLA<br />
              <span className="text-bw-gold">MANADA</span>
            </h1>

            <p className="font-body text-base md:text-lg text-bw-warm/80 mt-6 max-w-md leading-relaxed">
              Equipamiento táctico y urbano sin distinciones. La misma calidad extrema, las mismas telas de alto rendimiento para vos y tu mascota. Porque en BlackWolf no hay jerarquías, solo libertad para movernos juntos.
            </p>

            <div className="flex items-center gap-4 mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-bw-gold text-bw-black font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-gold-light transition-colors duration-300"
              >
                Ver colección
              </Link>
              <Link
                href="#narrative"
                className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.15em] text-bw-cream/70 hover:text-bw-gold transition-colors duration-300"
              >
                Nuestra historia <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BAND ─── */}
      <div className="bg-bw-gold py-3 overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap w-max animate-marquee">
          {[...bandItems, ...bandItems, ...bandItems].map((item, i) => (
            <span key={i} className="flex items-center gap-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-bw-black">
              <span className="w-1 h-1 rounded-full bg-bw-black/40" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── NARRATIVE ─── */}
      <Section id="narrative" className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <SectionLabel>Nuestra filosofía</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
              Libertad<br />
              <span className="text-bw-gold">sin etiquetas</span>
            </h2>
            <p className="font-body text-base text-bw-warm/70 mt-8 leading-relaxed max-w-lg">
              BlackWolf nació frente a una máquina de coser casera con una convicción clara: la verdadera libertad es poder expresar lo que uno es sin miedo a ser juzgado. Creemos que mascotas y personas son uno solo. Por eso, rompemos la línea que los separa. No hacemos "accesorios para mascotas" o "accesorios para humanos"; creamos herramientas de grado técnico para una sola manada que busca la excelencia.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-10 px-8 py-3.5 bg-bw-gold text-bw-black font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-gold-light transition-colors duration-300"
            >
              Conocer más
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-apple-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1584066049506-55caa521d2d3?w=600&q=70"
                alt="BlackWolf - Evolución Sinérgica"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-bw-gold/30 rounded-bl-apple-lg" />
          </div>
        </div>
      </Section>

      {/* ─── FEATURES ─── */}
      <Section className="bg-bw-dark py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
              Ingeniería para<br />el mundo real
            </h2>
            <p className="font-body text-base text-bw-warm/60 leading-relaxed self-end max-w-md">
              Buscamos siempre los mejores materiales posibles, y si los podemos mejorar, lo hacemos. Cada detalle está pensado para rendir al máximo, sin importar quién lo lleve puesto.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] rounded-apple-xl overflow-hidden">
            {features.map((f) => (
              <div
                key={f.num}
                className="bg-bw-dark p-10 md:p-12 hover:bg-bw-dark-hover transition-colors duration-500 group"
              >
                <span className="font-display text-xs text-bw-muted/40 tracking-widest">{f.num}</span>
                <f.icon className="w-7 h-7 text-bw-gold mt-6 stroke-[1.5]" />
                <h3 className="font-display font-bold text-lg uppercase tracking-wide text-bw-cream mt-6">
                  {f.title}
                </h3>
                <p className="font-body text-sm text-bw-warm/50 mt-4 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── PRODUCTS ─── */}
      <Section id="featured" className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
              Selección<br />destacada
            </h2>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.15em] text-bw-gold hover:text-bw-gold-light transition-colors duration-300"
            >
              Ver toda la colección <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {featuredFilters.map((filterName) => (
              <button
                key={filterName}
                type="button"
                onClick={() => setActiveFeaturedFilter(filterName)}
                className={`px-4 py-2 border rounded-full font-display text-[0.62rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  activeFeaturedFilter === filterName
                    ? 'border-bw-gold bg-bw-gold/10 text-bw-gold'
                    : 'border-white/15 text-bw-cream/70 hover:border-bw-gold hover:text-bw-gold'
                }`}
              >
                {filterName}
              </button>
            ))}
          </div>

          {productsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-bw-gold/20 border-t-bw-gold rounded-full animate-spin" />
            </div>
          ) : productsError ? (
            <div className="text-center py-20">
              <p className="font-body text-sm text-bw-muted mb-4">No pudimos cargar los productos en este momento.</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-bw-gold text-bw-black font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-gold-light transition-colors duration-300"
              >
                Reintentar
              </Link>
            </div>
          ) : featuredProducts.length === 0 ? (
            <p className="font-body text-sm text-bw-muted text-center py-20">No hay productos disponibles aún.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {featuredProducts.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className={`group relative bg-bw-dark rounded-apple-xl overflow-hidden ${
                    i === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                >
                  <div className={`relative ${i === 0 ? 'aspect-square' : 'aspect-[3/4]'} overflow-hidden`}>
                    <img
                      src={p.images?.[0]?.src || '/imagenes/hero.jpg'}
                      alt={p.images?.[0]?.alt || p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bw-black/80 via-transparent to-transparent" />
                  </div>

                  {p.sale_price && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-bw-gold/90 text-bw-black font-display text-[0.6rem] font-bold uppercase tracking-widest rounded-full">
                      Promo
                    </span>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className={`font-display font-bold uppercase tracking-wide text-bw-cream ${i === 0 ? 'text-xl' : 'text-sm'}`}>
                      {p.name}
                    </h3>
                    {i === 0 && p.categories?.[0] && (
                      <p className="font-body text-xs text-bw-warm/50 mt-1">{p.categories[0].name}</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-serif text-lg text-bw-gold">
                        ${parseFloat(p.price).toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                        className="px-4 py-2 border border-white/10 rounded-full font-display text-[0.6rem] font-bold uppercase tracking-widest text-bw-cream/70 hover:border-bw-gold hover:text-bw-gold transition-all duration-300"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/products"
            className="md:hidden flex items-center justify-center gap-1.5 mt-8 font-display text-xs uppercase tracking-[0.15em] text-bw-gold"
          >
            Ver toda la colección <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Section>

      {/* ─── SPLIT / COMMUNITY ─── */}
      <Section id="community" className="min-h-[600px]">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1535008652995-e95986556e32?w=600&q=70"
              alt="BlackWolf - Únete a la Manada"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-bw-cream flex items-center px-8 md:px-16 py-20 md:py-0">
            <div className="max-w-md">
              <SectionLabel>Comunidad</SectionLabel>
              <h2 className="font-display font-bold text-[clamp(2.5rem,4vw,4rem)] leading-[0.95] tracking-tight text-bw-black">
                Únete a<br />
                <span className="text-bw-brown">la Manada</span>
              </h2>
              <p className="font-body text-base text-bw-brown/70 mt-6 leading-relaxed">
                Una forma de ver la vida. Una comunidad que valora la libertad y el movimiento constante. Equipate con nosotros y compartí el camino con aquellos que no tienen miedo de ser quienes realmente son.
              </p>
              <Link
                href="/la-manada"
                className="mt-10 inline-flex px-8 py-3.5 bg-bw-black text-bw-cream font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-dark transition-colors duration-300"
              >
                Unirse ahora
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── TESTIMONIALS ─── */}
      <Section className="bg-bw-dark py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight text-center mb-20">
            Lo que dicen<br />
            <span className="text-bw-gold">los que se mueven</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative bg-white/[0.02] border border-white/5 rounded-apple-xl p-8 md:p-10 hover:border-white/10 transition-colors duration-500"
              >
                <span className="absolute top-6 right-8 font-serif text-6xl text-bw-gold/10 leading-none select-none">
                  &ldquo;
                </span>
                <p className="font-body text-sm text-bw-warm/70 leading-relaxed relative z-10">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-10 h-10 rounded-full bg-bw-brown flex items-center justify-center">
                    <span className="font-display text-xs font-bold text-bw-cream tracking-wider">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-bw-cream">{t.name}</p>
                    <p className="font-body text-xs text-bw-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── MANIFESTO ─── */}
      <Section className="relative py-48 md:py-60 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1745139755847-2883e6c746e2?w=800&q=70"
            alt="BlackWolf - Movimiento en Sinergia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-bw-black/80" />
        </div>
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display font-bold text-[22vw] uppercase tracking-tighter text-bw-gold/[0.04] whitespace-nowrap">
            BLACKWOLF
          </span>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
            Una sola<br />
            <span className="text-bw-gold">visión</span>
          </h2>
          <p className="font-body text-base text-bw-warm/60 mt-8 leading-relaxed max-w-lg mx-auto">
            Nuestro objetivo es simple: unificarlo todo. Que BlackWolf sea la marca definitiva que te acompañe a vos y a tu compañero en cada paso, con el diseño y la resistencia que exigen los líderes de la manada.
          </p>
          <div className="flex items-center justify-center gap-4 mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-bw-gold text-bw-black font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-gold-light transition-colors duration-300"
            >
              Explorar colección
            </Link>
            <Link
              href="#narrative"
              className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.15em] text-bw-cream/70 hover:text-bw-gold transition-colors duration-300"
            >
              Nuestra historia <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ─── NEWSLETTER ─── */}
      <Section id="newsletter" className="bg-bw-cream py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <span className="inline-block font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-brown mb-4">
              Comunidad
            </span>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight text-bw-black">
              Mantente<br />conectado
            </h2>
          </div>

          <div>
            <p className="font-body text-sm text-bw-brown/70 mb-6 leading-relaxed">
              Novedades, ofertas exclusivas y consejos de equipamiento. Sin spam, solo contenido que vale la pena.
            </p>
            <form
              className="flex gap-3"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 bg-bw-black/5 border border-bw-black/10 rounded-full font-body text-sm text-bw-black placeholder:text-bw-brown/40 focus:outline-none focus:border-bw-brown/40 transition-colors"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="px-8 py-3.5 bg-bw-black text-bw-cream font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-dark transition-colors duration-300"
              >
                {newsletterStatus === 'loading' ? 'Enviando...' : 'Suscribirse'}
              </button>
            </form>
            <p className="font-body text-[0.65rem] text-bw-brown/40 mt-3">
              Podés darte de baja cuando quieras.
            </p>
            {newsletterStatus !== 'idle' && (
              <p
                className={`font-body text-xs mt-2 ${newsletterStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}
              >
                {newsletterMessage}
              </p>
            )}
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
