import React from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';
import { Order } from '../../types/order';

interface OrderCardProps {
  order: Order;
}

const statusStyles: Record<string, string> = {
  completed: 'bg-green-500/10 text-green-400 border-green-500/20',
  processing: 'bg-bw-gold/10 text-bw-gold border-bw-gold/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-bw-dark rounded-apple-lg p-6 border border-white/5 hover:border-bw-gold/10 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-bw-gold/10">
            <Package className="w-5 h-5 text-bw-gold" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wide text-bw-cream">
              Pedido #{order.id}
            </h3>
            <p className="font-body text-xs text-bw-muted mt-0.5">
              {new Date(order.date_created).toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <span
          className={`font-display text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded-lg border ${
            statusStyles[order.status] || 'bg-white/5 text-bw-muted border-white/10'
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {order.line_items.map((item) => (
          <div key={item.id} className="flex justify-between font-body text-sm">
            <span className="text-bw-warm truncate flex-1">
              {item.name}
              <span className="text-bw-muted ml-1">×{item.quantity}</span>
            </span>
            <span className="text-bw-cream ml-4">${item.total}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="font-display font-bold text-xs uppercase tracking-wide text-bw-muted">
          Total
        </span>
        <span className="font-serif text-lg text-bw-gold">${order.total}</span>
      </div>
    </motion.div>
  );
};

export default OrderCard;