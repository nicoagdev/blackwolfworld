'use client';

import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { fetchOrders } from '@/services/woo/orders';
import { Order } from '@/types/order';
import OrderCard from '@/components/ecom/OrderCard';
import useAuth from '@/hooks/useAuth';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const loadOrders = async () => {
        try {
          const fetchedOrders = await fetchOrders(user.id);
          setOrders(fetchedOrders);
        } catch (err) {
          setError('No se pudieron cargar los pedidos');
        } finally {
          setLoading(false);
        }
      };
      loadOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-bw-gold/20 border-t-bw-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
        <p className="font-body text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
      <h1 className="font-display font-bold text-2xl uppercase tracking-wide mb-12">
        Mis pedidos
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-28">
          <Package className="w-16 h-16 text-bw-muted/30 mx-auto mb-6" />
          <h2 className="font-display font-bold text-xl uppercase tracking-wide mb-3">
            Sin pedidos aún
          </h2>
          <p className="font-body text-sm text-bw-muted">
            Tus pedidos aparecerán acá una vez que compres.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;