'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Shield, Radio, Eye, ChevronRight } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import useProducts from '@/hooks/useProducts';
import useCart from '@/hooks/useCart';
import { Product } from '@/types/product';

/* ── Helpers ─────────────────────────────────────────── */

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
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
    title: 'Durabilidad extrema',
    desc: 'Materiales resistentes a impactos, agua y desgaste. Certificados para las condiciones más exigentes del terreno.',
  },
  {
    num: '02',
    icon: Radio,
    title: 'GPS en tiempo real',
    desc: 'Rastreo preciso con actualización cada 10 segundos. Compatible con iOS y Android sin suscripción adicional.',
  },
  {
    num: '03',
    icon: Eye,
    title: 'Diseño ergonómico',
    desc: 'Formas estudiadas para máxima comodidad en movimiento. Probadas por más de 500 horas en campo.',
  },
];



const testimonials = [
  {
    quote: 'El collar GPS cambió completamente la forma en que salgo a correr con mi perro. Tranquilidad total en tiempo real.',
    initials: 'MG',
    name: 'María González',
    role: 'Dueña de mascota · Buenos Aires',
  },
  {
    quote: 'Tecnología de vanguardia con un diseño que no grita. Mi tracker GPS es lo primero que meto en la mochila antes de cada salida.',
    initials: 'CR',
    name: 'Carlos Rodríguez',
    role: 'Trail runner · Mendoza',
  },
  {
    quote: 'Cada producto está pensado para durar. No es equipamiento descartable — se nota que detrás hay alguien que realmente lo usa.',
    initials: 'AL',
    name: 'Ana López',
    role: 'Entrenadora fitness · Rosario',
  },
];

const bandItems = [
  'Envío gratis +$50.000',
  'Garantía 2 años',
  'Devolución 30 días',
  'GPS integrado',
  'Tecnología premium',
];

/* ── Page ────────────────────────────────────────────── */

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const { allProducts, loading: productsLoading } = useProducts();
  const { addToCart } = useCart();
  const featuredProducts = allProducts.slice(0, 4);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <main className="bg-bw-black text-bw-cream overflow-x-hidden">
      <Header />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-svh min-h-[680px] flex items-end">
        {/* Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -z-0">
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1800&q=80"
            alt="BlackWolf aventura"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bw-black via-bw-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bw-black via-transparent to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xl"
          >
            <SectionLabel>Nueva colección 2025</SectionLabel>

            <h1 className="font-display font-bold text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight mt-2">
              Move<br />
              <span className="text-bw-gold">Different</span>
            </h1>

            <p className="font-body text-base md:text-lg text-bw-warm/80 mt-6 max-w-md leading-relaxed">
              Equipamiento técnico premium para humanos y mascotas. Donde la innovación se encuentra con el territorio.
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
          </motion.div>
        </motion.div>
      </section>

      {/* ─── BAND ─── */}
      <div className="bg-bw-gold py-3 overflow-hidden">
        <div className="flex items-center gap-8 animate-[scroll_20s_linear_infinite] whitespace-nowrap">
          {[...bandItems, ...bandItems].map((item, i) => (
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
              Built for<br />
              <span className="text-bw-gold">real life</span>
            </h2>
            <p className="font-body text-base text-bw-warm/70 mt-8 leading-relaxed max-w-lg">
              BlackWolf nació de una convicción simple: el equipamiento técnico no debería elegir entre rendimiento y diseño. Cada producto es el resultado de años de investigación en campo.
            </p>
            <p className="font-body text-base text-bw-warm/50 mt-4 leading-relaxed max-w-lg">
              Desde el asfalto de la ciudad hasta los senderos más exigentes, nos movemos contigo.
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
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=900&q=80"
                alt="Aventura BlackWolf"
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
              Por qué<br />BlackWolf
            </h2>
            <p className="font-body text-base text-bw-warm/60 leading-relaxed self-end max-w-md">
              Tecnología avanzada, materiales de ingeniería y un diseño pensado para cada condición. No hacemos compromisos.
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
      <Section className="py-28 md:py-40">
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

          {productsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-bw-gold/20 border-t-bw-gold rounded-full animate-spin" />
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
      <Section className="min-h-[600px]">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?w=900&q=80"
              alt="BlackWolf Lifestyle"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-bw-cream flex items-center px-8 md:px-16 py-20 md:py-0">
            <div className="max-w-md">
              <SectionLabel>Comunidad</SectionLabel>
              <h2 className="font-display font-bold text-[clamp(2.5rem,4vw,4rem)] leading-[0.95] tracking-tight text-bw-black">
                Join<br />
                <span className="text-bw-brown">the pack</span>
              </h2>
              <p className="font-body text-base text-bw-brown/70 mt-6 leading-relaxed">
                Una comunidad de aventureros que no hace concesiones. Comparte rutas, experiencias y el mismo compromiso con lo que los mueve.
              </p>
              <button className="mt-10 px-8 py-3.5 bg-bw-black text-bw-cream font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-dark transition-colors duration-300">
                Unirse ahora
              </button>
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

          <div className="grid md:grid-cols-3 gap-6">
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
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display font-bold text-[22vw] uppercase tracking-tighter text-bw-gold/[0.04] whitespace-nowrap">
            BLACKWOLF
          </span>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
            Built for<br />
            <span className="text-bw-gold">movement</span>
          </h2>
          <p className="font-body text-base text-bw-warm/60 mt-8 leading-relaxed max-w-lg mx-auto">
            BlackWolf diseña herramientas para la vida diaria. Movimiento, adaptación y evolución constante en cada producto.
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
      <Section className="bg-bw-cream py-24 md:py-32">
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
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-5 py-3.5 bg-bw-black/5 border border-bw-black/10 rounded-full font-body text-sm text-bw-black placeholder:text-bw-brown/40 focus:outline-none focus:border-bw-brown/40 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-bw-black text-bw-cream font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-dark transition-colors duration-300"
              >
                Suscribirse
              </button>
            </form>
            <p className="font-body text-[0.65rem] text-bw-brown/40 mt-3">
              Podés darte de baja cuando quieras.
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
