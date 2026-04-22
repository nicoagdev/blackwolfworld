'use client';

import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const manifestoSections = [
  {
    title: 'El Origen: De la Curiosidad a la Accion',
    paragraphs: [
      'BlackWolf no nacio en una oficina, nacio frente a una maquina de coser casera. Durante anos, observe a mi madre transformar telas y hacer arreglos; el respeto por el oficio estaba ahi, pero el desafio parecia lejano. Siempre me fascino la construccion de accesorios, esa ingenieria detras de una mochila o una rinonera, hasta que un dia decidi dejar de observar y empezar a hacer.',
      'Mi primer neceser fue la revelacion: "puedo hacer de todo". Ese momento de libertad creativa fue el que encendio la chispa de lo que hoy ves aqui.',
    ],
  },
  {
    title: 'Una Sola Esencia: Mascotas y Personas',
    paragraphs: [
      'En BlackWolf no creemos en jerarquias de calidad. Por que el equipo de tu mascota deberia ser menos resistente que el tuyo. Combinamos articulos para mascotas y humanos porque somos uno.',
      'Disenamos con la premisa de que ambos merecen la misma durabilidad y estetica. No hacemos "accesorios para perros" o "accesorios para personas"; creamos herramientas de alta gama para los miembros de una misma manada.',
    ],
  },
  {
    title: 'La Filosofia de la Manada',
    paragraphs: [
      'Para nosotros, la Manada es una forma de ver la vida. Es el valor de la libertad y el poder de expresarte exactamente como sos, sin miedo a los juicios.',
      'Es un grupo que trabaja por el crecimiento comun, moviendose con seguridad y estilo.',
    ],
  },
  {
    title: 'Calidad sin Concesiones (Tested in the Wild)',
    paragraphs: [
      'No nos conformamos. Si un material puede mejorarse, lo mejoramos. Utilizamos las telas de mayor rendimiento que podemos conseguir y sometemos cada producto a pruebas reales: sol extremo, arena de playa y uso intensivo diario.',
      'Si no rinde bajo presion, no lleva nuestro logo.',
    ],
  },
];

export default function ManifiestoPage() {
  return (
    <div className="min-h-screen bg-bw-black text-bw-cream">
      <Header />
      <main className="pt-24 pb-24">
        <section className="relative min-h-[70svh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/imagenes/lifestyle.jpg"
              alt="BlackWolf - El Manifiesto"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bw-black via-bw-black/80 to-bw-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-bw-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-20 w-full">
            <div className="max-w-3xl">
              <span className="inline-block font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-gold mb-3">
                Identidad BlackWolf
              </span>
              <h1 className="font-display font-bold text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] tracking-tight">
                El Manifiesto<br />
                <span className="text-bw-gold">de la Manada</span>
              </h1>
              <p className="font-body text-base md:text-lg text-bw-warm/75 mt-6 leading-relaxed max-w-2xl">
                Una historia de oficio, pruebas reales y una idea simple: si somos una sola manada, merecemos la misma excelencia.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 mt-16 md:mt-20 space-y-10">
          {manifestoSections.map((section, sectionIndex) => (
            <article key={section.title} className="bg-bw-dark border border-white/5 rounded-apple-xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-display text-xs tracking-[0.2em] text-bw-gold/70">0{sectionIndex + 1}</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.3rem)] leading-[0.98] tracking-tight text-bw-cream">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="font-body text-sm md:text-base text-bw-warm/65 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 mt-14">
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <article className="bg-bw-dark border border-white/5 rounded-apple-xl p-8 md:p-10">
              <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.3rem)] leading-[0.98] tracking-tight text-bw-cream">
                El Equipo detras del Lobo
              </h2>
              <div className="mt-6 space-y-4">
                <p className="font-body text-sm md:text-base text-bw-warm/65 leading-relaxed">
                  Somos una estructura familiar donde cada pieza es fundamental.
                </p>
                <p className="font-body text-sm md:text-base text-bw-warm/65 leading-relaxed">
                  <span className="text-bw-cream">Molderia y Corte:</span> la experiencia y precision de mi madre, quien me inspiro desde el primer dia.
                </p>
                <p className="font-body text-sm md:text-base text-bw-warm/65 leading-relaxed">
                  <span className="text-bw-cream">Diseno y Costura:</span> mi mano derecha en la maquina y mi cabeza en la creacion de cada nueva idea.
                </p>
                <p className="font-body text-sm md:text-base text-bw-warm/65 leading-relaxed">
                  <span className="text-bw-cream">Comunicacion:</span> mi hermano, encargado de transmitir nuestra identidad y conectar con la manada en el mundo digital.
                </p>
                <p className="font-body text-sm md:text-base text-bw-warm/65 leading-relaxed">
                  Nuestra meta es clara: que cuando veas un producto BlackWolf, no pienses en una categoria, sino en la excelencia de una pieza disenada para durar.
                </p>
              </div>
            </article>

            <div className="relative rounded-apple-xl overflow-hidden border border-white/5 min-h-[320px] md:min-h-full">
              <img
                src="/imagenes/hero.jpg"
                alt="BlackWolf - Taller y proceso"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bw-black/80 via-bw-black/20 to-transparent" />
            </div>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 mt-14">
          <div className="bg-bw-dark border border-white/5 rounded-apple-xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-gold mb-2">
                Siguiente paso
              </p>
              <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-bw-cream">
                Esto es solo el comienzo
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/la-manada"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-bw-gold text-bw-black font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-gold-light transition-colors duration-300"
              >
                Conocer La Manada
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/15 text-bw-cream font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:border-bw-gold hover:text-bw-gold transition-colors duration-300"
              >
                Ir a tienda
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
