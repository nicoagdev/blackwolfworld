import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import useCart from '../../hooks/useCart';
import Input from '@/ui/input';

const CheckoutForm = () => {
  const { cartItems, totalAmount } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'checkout',
          data: formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Error al procesar el pedido. Intentá nuevamente.');
      }

      setSuccessMessage('Pedido enviado. Te contactaremos por email para confirmar.');
      setFormData({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pedido. Intentá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
    { name: 'address', label: 'Dirección', type: 'text', placeholder: 'Calle y número' },
    { name: 'city', label: 'Ciudad', type: 'text', placeholder: 'Tu ciudad' },
    { name: 'postalCode', label: 'Código postal', type: 'text', placeholder: '1234' },
    { name: 'country', label: 'País', type: 'text', placeholder: 'Argentina' },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-bw-dark rounded-apple-xl p-8 border border-white/5"
    >
      <h2 className="font-display font-bold text-xl uppercase tracking-wide text-bw-cream mb-2">
        Datos de envío
      </h2>
      <p className="font-body text-sm text-bw-muted mb-8">
        Completá tus datos para recibir tu pedido
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
          <p className="font-body text-sm text-red-400">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
          <p className="font-body text-sm text-green-400">{successMessage}</p>
        </div>
      )}

      <div className="space-y-5">
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-white/[0.02] border border-white/5 rounded-xl mb-8">
        <div className="flex justify-between font-body text-sm mb-2">
          <span className="text-bw-muted">Total a pagar</span>
          <span className="font-serif text-lg text-bw-gold">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 font-display font-bold text-sm tracking-widest uppercase bg-bw-gold text-bw-black py-4 rounded-xl hover:bg-bw-gold-light transition-all duration-300 active:scale-[0.98] shadow-lg shadow-bw-gold/20 disabled:opacity-50"
      >
        <Lock className="w-4 h-4" />
        {isSubmitting ? 'Procesando...' : 'Confirmar pedido'}
      </button>
    </motion.form>
  );
};

export default CheckoutForm;