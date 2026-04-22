'use client';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const faqs = [
  {
    question: 'Como compro en la tienda?',
    answer: 'Explora la tienda, elegi una categoria o producto, agregalo al carrito y completa el checkout con tus datos.',
  },
  {
    question: 'Hacen envios?',
    answer: 'Si. Una vez enviado el pedido por checkout, BlackWolf te contacta para coordinar entrega, envio o retiro.',
  },
  {
    question: 'Puedo consultar por un producto antes de comprar?',
    answer: 'Si. Podes escribir a hola@blackwolfworld.com o abrir WhatsApp desde el footer para recibir asesoramiento.',
  },
  {
    question: 'Trabajan con categorias especiales o lanzamientos?',
    answer: 'Si. El catalogo puede cambiar segun disponibilidad y nuevas colecciones, por eso el menu Explorar toma las categorias activas del inventario actual.',
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-bw-black text-bw-cream">
      <Header />
      <main className="max-w-[1000px] mx-auto px-6 md:px-12 pt-32 pb-24">
        <span className="inline-block font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-gold mb-3">
          Soporte
        </span>
        <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
          FAQ
        </h1>
        <p className="font-body text-base text-bw-warm/65 mt-6 leading-relaxed max-w-2xl">
          Respuestas rapidas para entender como funciona la tienda, el contacto y la logica de compra de BlackWolf.
        </p>

        <div className="mt-16 space-y-5">
          {faqs.map((item) => (
            <section
              key={item.question}
              className="bg-bw-dark border border-white/5 rounded-apple-xl p-8"
            >
              <h2 className="font-display font-bold text-lg tracking-wide text-bw-cream">
                {item.question}
              </h2>
              <p className="font-body text-sm text-bw-warm/60 mt-3 leading-relaxed">
                {item.answer}
              </p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}