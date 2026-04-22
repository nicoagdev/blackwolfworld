'use client';

import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const articles = [
  {
    title: 'Como elegir equipamiento para una vida activa con tu perro',
    excerpt: 'Una guia practica para elegir piezas resistentes, comodas y pensadas para el uso real en ciudad y naturaleza.',
  },
  {
    title: 'La logica BlackWolf: menos accesorio, mas sistema',
    excerpt: 'Por que disenar para la manada implica pensar en movimiento, materiales y durabilidad antes que en tendencia.',
  },
  {
    title: 'Mantenimiento basico para que tu equipo dure mas',
    excerpt: 'Limpieza, guardado y chequeos simples para extender la vida util del equipamiento tecnico.',
  },
  {
    title: 'Villa Gesell en modo manada: rutina y equipamiento',
    excerpt: 'Micro-habitos para entrenar constancia, orden y comodidad en salidas diarias con tu companero.',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bw-black text-bw-cream">
      <Header />
      <main className="pt-24 pb-24">
        <section className="relative min-h-[58svh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/imagenes/lifestyle.jpg"
              alt="BlackWolf Blog"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bw-black via-bw-black/70 to-bw-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-bw-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 pb-14 md:pb-16 w-full">
            <span className="inline-block font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-gold mb-3">
              Journal
            </span>
            <h1 className="font-display font-bold text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.9] tracking-tight max-w-2xl">
              Blog BlackWolf
            </h1>
            <p className="font-body text-base md:text-lg text-bw-warm/75 mt-6 leading-relaxed max-w-2xl">
              Ideas, guias y criterio de producto para quienes viven la ciudad y la naturaleza con la misma intensidad.
            </p>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 mt-12">
          <div className="p-6 border border-white/10 rounded-apple-xl bg-white/[0.02] max-w-3xl">
          <p className="font-display text-[0.65rem] uppercase tracking-[0.2em] text-bw-gold mb-2">Linea editorial</p>
          <p className="font-body text-sm text-bw-warm/65 leading-relaxed">
            Este blog se orienta a contenido practico: eleccion de materiales, cuidado de equipo, cultura de movimiento y experiencias reales de la comunidad BlackWolf.
          </p>
        </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <article className="relative min-h-[320px] rounded-apple-xl overflow-hidden border border-white/5">
              <img
                src="/imagenes/hero.jpg"
                alt="Articulo destacado BlackWolf"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bw-black/90 via-bw-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="font-display text-[0.65rem] uppercase tracking-[0.18em] text-bw-gold mb-3">Destacado</p>
                <h2 className="font-display font-bold text-2xl tracking-tight text-bw-cream">
                  Del taller al terreno: como validamos cada pieza
                </h2>
                <p className="font-body text-sm text-bw-warm/70 mt-3 leading-relaxed">
                  Una mirada al proceso real de diseno, prueba y ajuste antes de que un producto BlackWolf llegue a la manada.
                </p>
              </div>
            </article>

            <div className="space-y-4">
              {articles.slice(0, 2).map((article) => (
                <article key={article.title} className="bg-bw-dark border border-white/5 rounded-apple-xl p-6">
                  <p className="font-display text-[0.65rem] uppercase tracking-[0.18em] text-bw-gold mb-3">
                    Proximamente
                  </p>
                  <h3 className="font-display font-bold text-xl tracking-tight text-bw-cream">
                    {article.title}
                  </h3>
                  <p className="font-body text-sm text-bw-warm/60 mt-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
          {articles.map((article) => (
            <article
              key={article.title}
              className="bg-bw-dark border border-white/5 rounded-apple-xl p-8"
            >
              <p className="font-display text-[0.65rem] uppercase tracking-[0.18em] text-bw-gold mb-4">
                Proximamente
              </p>
              <h2 className="font-display font-bold text-xl tracking-tight text-bw-cream">
                {article.title}
              </h2>
              <p className="font-body text-sm text-bw-warm/60 mt-4 leading-relaxed">
                {article.excerpt}
              </p>
            </article>
          ))}
        </div>

          <div className="mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-bw-gold text-bw-black font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-gold-light transition-colors duration-300"
            >
              Ver tienda
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}