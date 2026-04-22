'use client';

import { FormEvent, useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: ContactFormState = {
  name: '',
  email: '',
  message: '',
};

export default function ContactoPage() {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim().toLowerCase();
    const trimmedMessage = formState.message.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !emailRegex.test(trimmedEmail) || !trimmedMessage) {
      setStatus('error');
      setFeedbackMessage('Revisa los campos y completa todos los datos correctamente.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'contact',
          data: {
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'No se pudo enviar el mensaje.');
      }

      setFormState(initialState);
      setStatus('success');
      setFeedbackMessage('Mensaje enviado. Te responderemos en breve.');
    } catch (error) {
      setStatus('error');
      setFeedbackMessage(error instanceof Error ? error.message : 'Error enviando el formulario.');
    }
  };

  return (
    <div className="min-h-screen bg-bw-black text-bw-cream">
      <Header />
      <main className="pt-24 pb-24">
        <section className="relative min-h-[56svh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/imagenes/blackwolfgesell.jpg"
              alt="BlackWolf - Contacto"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bw-black via-bw-black/75 to-bw-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-bw-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 pb-14 md:pb-16 w-full">
            <span className="inline-block font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-bw-gold mb-3">
              Contacto directo
            </span>
            <h1 className="font-display font-bold text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.9] tracking-tight max-w-2xl">
              Hablemos
            </h1>
            <p className="font-body text-base md:text-lg text-bw-warm/75 mt-6 leading-relaxed max-w-2xl">
              Si tienes dudas sobre productos, stock o compras personalizadas, envianos un mensaje. Tambien puedes escribirnos por WhatsApp o email directo.
            </p>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 mt-12">
          <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-bw-dark border border-white/5 rounded-apple-xl p-8 space-y-4 h-fit">
            <h2 className="font-display font-bold text-2xl tracking-tight text-bw-cream">Datos directos</h2>
            <p className="font-body text-sm text-bw-warm/60">Villa Gesell, Buenos Aires</p>
            <a
              href="mailto:hola@blackwolfworld.com"
              className="block font-body text-sm text-bw-warm/75 hover:text-bw-gold transition-colors"
            >
              hola@blackwolfworld.com
            </a>
            <a
              href="http://wa.me/5492255421676"
              target="_blank"
              rel="noreferrer"
              className="block font-body text-sm text-bw-warm/75 hover:text-bw-gold transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/blackwolf_world"
              target="_blank"
              rel="noreferrer"
              className="block font-body text-sm text-bw-warm/75 hover:text-bw-gold transition-colors"
            >
              @blackwolf_world
            </a>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="font-display text-[0.65rem] uppercase tracking-[0.2em] text-bw-gold mb-3">
                Horario de respuesta
              </p>
              <p className="font-body text-sm text-bw-warm/65 leading-relaxed">
                Respondemos mensajes en el dia habil siguiente y coordinamos por orden de llegada.
              </p>
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className="bg-bw-dark border border-white/5 rounded-apple-xl p-8 space-y-5"
          >
            <div>
              <label className="block font-display text-xs uppercase tracking-[0.15em] text-bw-warm/70 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(event) => setFormState((currentValue) => ({ ...currentValue, name: event.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 font-body text-sm text-bw-cream placeholder:text-bw-warm/35 focus:outline-none focus:border-bw-gold/40"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label className="block font-display text-xs uppercase tracking-[0.15em] text-bw-warm/70 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(event) => setFormState((currentValue) => ({ ...currentValue, email: event.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 font-body text-sm text-bw-cream placeholder:text-bw-warm/35 focus:outline-none focus:border-bw-gold/40"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block font-display text-xs uppercase tracking-[0.15em] text-bw-warm/70 mb-2">
                Mensaje
              </label>
              <textarea
                value={formState.message}
                onChange={(event) => setFormState((currentValue) => ({ ...currentValue, message: event.target.value }))}
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 font-body text-sm text-bw-cream placeholder:text-bw-warm/35 focus:outline-none focus:border-bw-gold/40 resize-none"
                placeholder="Contanos que necesitas"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-bw-gold text-bw-black font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-bw-gold-light transition-colors duration-300 disabled:opacity-70"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
            </button>

            {status !== 'idle' && (
              <p className={`font-body text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {feedbackMessage}
              </p>
            )}
          </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
