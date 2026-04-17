import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

const PaymentWidget = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const methods = [
    { value: 'credit_card', label: 'Tarjeta de crédito' },
    { value: 'debit_card', label: 'Tarjeta de débito' },
    { value: 'transfer', label: 'Transferencia' },
  ];

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-apple-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-5 h-5 text-bw-gold" />
        <h3 className="font-display font-bold text-sm uppercase tracking-wide text-bw-cream">
          Método de pago
        </h3>
        <Lock className="w-3.5 h-3.5 text-bw-muted ml-auto" />
      </div>

      <div className="space-y-2">
        {methods.map((method) => (
          <button
            key={method.value}
            type="button"
            onClick={() => setPaymentMethod(method.value)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 text-left ${
              paymentMethod === method.value
                ? 'border-bw-gold/50 bg-bw-gold/5'
                : 'border-white/5 hover:border-white/15'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                paymentMethod === method.value
                  ? 'border-bw-gold'
                  : 'border-white/20'
              }`}
            >
              {paymentMethod === method.value && (
                <div className="w-2 h-2 rounded-full bg-bw-gold" />
              )}
            </div>
            <span className="font-body text-sm text-bw-cream">{method.label}</span>
          </button>
        ))}
      </div>

      {error && (
        <p className="font-body text-xs text-red-400 mt-4">{error}</p>
      )}

      <p className="font-body text-[0.7rem] text-bw-muted/50 mt-4 flex items-center gap-1.5">
        <Lock className="w-3 h-3" />
        Pago seguro y encriptado
      </p>
    </div>
  );
};

export default PaymentWidget;