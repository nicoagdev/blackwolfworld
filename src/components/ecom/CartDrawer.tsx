import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/ui/sheet';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import useCart from '../../hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-bw-black border-l border-white/5">
        <SheetHeader className="border-b border-white/5 pb-4">
          <SheetTitle className="flex items-center gap-3 font-display font-bold uppercase tracking-wide text-bw-cream">
            <ShoppingBag className="w-5 h-5 text-bw-gold" />
            Carrito
            {cartItems.length > 0 && (
              <span className="bg-bw-gold text-bw-black text-[0.65rem] font-bold px-2 py-0.5 rounded-lg">
                {cartItems.length}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            <AnimatePresence>
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <p className="font-display font-bold text-lg uppercase text-bw-cream">
                    Tu carrito está vacío
                  </p>
                  <p className="font-body text-sm text-bw-muted mt-2">
                    Explorá nuestra colección
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-white/5 pt-4">
              <CartSummary />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;