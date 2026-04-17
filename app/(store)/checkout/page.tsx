'use client';

import { useEffect, useState } from 'react';
import CheckoutForm from '@/components/ecom/CheckoutForm';
import CartSummary from '@/components/ecom/CartSummary';
import PaymentWidget from '@/components/ecom/PaymentWidget';
import useCart from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    } else {
      setIsLoading(false);
    }
  }, [cartItems, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-bw-gold/20 border-t-bw-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
      <h1 className="font-display font-bold text-2xl uppercase tracking-wide mb-12">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CheckoutForm />
          <PaymentWidget />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;