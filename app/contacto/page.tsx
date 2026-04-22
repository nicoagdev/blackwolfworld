'use client';

import { FormEvent, useState } from 'react';
import { AtSign, Building2, Mail, MapPin, MessageCircle, ShieldAlert, Truck, UserRound } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  profile: string;
  reason: string;
  company: string;
  orderReference: string;
  message: string;
};

const initialState: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  profile: '',
  reason: '',
  company: '',
  orderReference: '',
  message: '',
};

const profileOptions = [
  { value: 'particular', label: 'Particular' },
  { value: 'empresa', label: 'Empresa' },
  { value: 'proveedor', label: 'Proveedor' },
  { value: 'distribuidor', label: 'Distribuidor / Punto de venta' },
];

const reasonOptions = [
  { value: 'consulta-producto', label: 'Consulta sobre producto' },
  { value: 'compra-mayorista', label: 'Compra mayorista o corporativa' },
  { value: 'soporte-pedido', label: 'Problema con pedido o postventa' },
  { value: 'alianza', label: 'Alianzas y colaboraciones' },
  { value: 'otro', label: 'Otro motivo' },
];

export default function ContactoPage() {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim().toLowerCase();
    const trimmedPhone = formState.phone.trim();
    const trimmedProfile = formState.profile.trim();
    const trimmedReason = formState.reason.trim();
    const trimmedCompany = formState.company.trim();
    const trimmedOrderReference = formState.orderReference.trim();
    const trimmedMessage = formState.message.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !emailRegex.test(trimmedEmail) || !trimmedProfile || !trimmedReason || !trimmedMessage) {
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
            phone: trimmedPhone,
            profile: trimmedProfile,
            reason: trimmedReason,
            company: trimmedCompany,
            orderReference: trimmedOrderReference,
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
          <section className="bg-bw-dark border border-white/5 rounded-apple-xl p-8 h-fit">
            <h2 className="font-display font-bold text-2xl tracking-tight text-bw-cream">Canales de contacto</h2>
            <p className="font-body text-sm text-bw-warm/60 mt-2">Elegi el canal que te quede mas comodo y te respondemos rapido.</p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:hola@blackwolfworld.com"
                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-bw-gold/40 transition-colors"
              >
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-bw-gold/15 text-bw-gold">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="font-body text-sm text-bw-warm/80">hola@blackwolfworld.com</span>
              </a>

              <a
                href="http://wa.me/5492255421676"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-bw-gold/40 transition-colors"
              >
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-bw-gold/15 text-bw-gold">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <span className="font-body text-sm text-bw-warm/80">WhatsApp directo</span>
              </a>

              <a
                href="https://instagram.com/blackwolf_world"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-bw-gold/40 transition-colors"
              >
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-bw-gold/15 text-bw-gold">
                  <AtSign className="w-4 h-4" />
                </span>
                <span className="font-body text-sm text-bw-warm/80">@blackwolf_world</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
              <p className="flex items-center gap-2 font-body text-sm text-bw-warm/70">
                <MapPin className="w-4 h-4 text-bw-gold" /> Villa Gesell, Buenos Aires
              </p>
              <p className="flex items-center gap-2 font-body text-sm text-bw-warm/70">
                <ShieldAlert className="w-4 h-4 text-bw-gold" /> Respondemos dentro del dia habil siguiente.
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

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-display text-xs uppercase tracking-[0.15em] text-bw-warm/70 mb-2">
                  <span className="inline-flex items-center gap-2"><UserRound className="w-3.5 h-3.5" /> Perfil</span>
                </label>
                <select
                  value={formState.profile}
                  onChange={(event) => setFormState((currentValue) => ({ ...currentValue, profile: event.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 font-body text-sm text-bw-cream focus:outline-none focus:border-bw-gold/40"
                  required
                >
                  <option value="" className="bg-bw-dark">Selecciona una opcion</option>
                  {profileOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-bw-dark">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-display text-xs uppercase tracking-[0.15em] text-bw-warm/70 mb-2">
                  <span className="inline-flex items-center gap-2"><Building2 className="w-3.5 h-3.5" /> Empresa (opcional)</span>
                </label>
                <input
                  type="text"
                  value={formState.company}
                  onChange={(event) => setFormState((currentValue) => ({ ...currentValue, company: event.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 font-body text-sm text-bw-cream placeholder:text-bw-warm/35 focus:outline-none focus:border-bw-gold/40"
                  placeholder="Nombre comercial"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-display text-xs uppercase tracking-[0.15em] text-bw-warm/70 mb-2">
                  <span className="inline-flex items-center gap-2"><Truck className="w-3.5 h-3.5" /> Motivo</span>
                </label>
                <select
                  value={formState.reason}
                  onChange={(event) => setFormState((currentValue) => ({ ...currentValue, reason: event.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 font-body text-sm text-bw-cream focus:outline-none focus:border-bw-gold/40"
                  required
                >
                  <option value="" className="bg-bw-dark">Selecciona un motivo</option>
                  {reasonOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-bw-dark">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-display text-xs uppercase tracking-[0.15em] text-bw-warm/70 mb-2">
                  Telefono (opcional)
                </label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(event) => setFormState((currentValue) => ({ ...currentValue, phone: event.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 font-body text-sm text-bw-cream placeholder:text-bw-warm/35 focus:outline-none focus:border-bw-gold/40"
                  placeholder="+54 9 ..."
                />
              </div>
            </div>

            <div>
              <label className="block font-display text-xs uppercase tracking-[0.15em] text-bw-warm/70 mb-2">
                Numero de pedido (opcional)
              </label>
              <input
                type="text"
                value={formState.orderReference}
                onChange={(event) => setFormState((currentValue) => ({ ...currentValue, orderReference: event.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 font-body text-sm text-bw-cream placeholder:text-bw-warm/35 focus:outline-none focus:border-bw-gold/40"
                placeholder="#BW-0000"
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
