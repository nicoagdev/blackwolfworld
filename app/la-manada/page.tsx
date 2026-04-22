'use client';

import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const communityPillars = [
  {
    title: 'Movimiento compartido',
    description:
      'La comunidad BlackWolf conecta personas y mascotas que viven la ciudad, la costa y la naturaleza con una misma energia.',
  },
  {
    title: 'Experiencia util',
    description:
      'Intercambiamos practicas reales: rutas, recomendaciones y aprendizajes que mejoran la vida cotidiana con la manada.',
  },
  {
    title: 'Cultura de cuidado',
    description:
      'Resistencia tambien es cuidar. Priorizamos bienestar, adaptacion y equipamiento que no limite el movimiento.',
  },
];

export default function LaManadaPage() {
  return (
    <div className="min-h-screen bg-bw-black text-bw-cream">
      <Header />
      <main className="pt-24 pb-24">
        <section className="relative min-h-[68svh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/imagenes/mascotas.jpg"
              alt="BlackWolf - La Manada"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bw-black via-bw-black/75 to-bw-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-bw-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-20 w-full">
            <div className="max-w-3xl">
              <span className="inline-block font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-gold mb-3">
                Comunidad BlackWolf
              </span>
              <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] tracking-tight">
                La Manada
              </h1>
              <p className="font-body text-base md:text-lg text-bw-warm/75 mt-6 leading-relaxed max-w-2xl">
                Una red de personas y mascotas que vive con la misma regla: moverse con libertad, criterio y presencia.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 mt-14">
          <div className="grid md:grid-cols-3 gap-6">
            {communityPillars.map((pillar) => (
              <article key={pillar.title} className="bg-bw-dark border border-white/5 rounded-apple-xl p-8">
                <h2 className="font-display font-bold text-xl tracking-tight text-bw-cream">
                  {pillar.title}
                </h2>
                <p className="font-body text-sm text-bw-warm/60 mt-4 leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 mt-10">
          <div className="grid md:grid-cols-[1.2fr,1fr] gap-6">
            <article className="bg-bw-dark border border-white/5 rounded-apple-xl p-8 md:p-10">
              <p className="font-display text-[0.65rem] uppercase tracking-[0.2em] text-bw-gold mb-3">Filosofia</p>
              <h2 className="font-display font-bold text-[clamp(1.8rem,3vw,2.5rem)] leading-[0.95] tracking-tight">
                Una forma de vida
              </h2>
              <p className="font-body text-sm md:text-base text-bw-warm/65 mt-5 leading-relaxed">
                Para BlackWolf, la manada no es una tendencia ni una etiqueta. Es una forma de crecer en conjunto, sostener identidad propia y elegir equipo que acompañe ese ritmo sin convertirse en una limitacion.
              </p>
              <p className="font-body text-sm md:text-base text-bw-warm/65 mt-4 leading-relaxed">
                Nos importa la calidad de uso, la estetica con sentido y el respeto por cada integrante de la manada, humano o animal.
              </p>
            </article>

            <div className="relative rounded-apple-xl overflow-hidden border border-white/5 min-h-[320px]">
              <img
                src="/imagenes/blackwolfgesell.jpg"
                alt="BlackWolf - Comunidad"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bw-black/80 via-bw-black/20 to-transparent" />
            </div>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 mt-12">
          <div className="bg-bw-dark border border-white/5 rounded-apple-xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-gold mb-2">
                Enlace directo
              </p>
              <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-bw-cream">
                Sumate a la conversacion
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-bw-gold text-bw-black font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-gold-light transition-colors duration-300"
              >
                Quiero sumarme
              </Link>
              <Link
                href="/manifiesto"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/15 text-bw-cream font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:border-bw-gold hover:text-bw-gold transition-colors duration-300"
              >
                Leer manifiesto
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
