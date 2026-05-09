'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Phone } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatPrice, formatOrderDate } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types';

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  pending: 'confirmed',
  confirmed: 'ready',
  ready: 'delivered',
  delivered: null,
  cancelled: null,
};

const NEXT_LABEL: Record<OrderStatus, string> = {
  pending: 'Conferma',
  confirmed: 'Pronto',
  ready: 'Consegnato',
  delivered: '',
  cancelled: '',
};

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

export default function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  const nextStatus = NEXT_STATUS[order.status];

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-primary text-sm">{order.orderNumber}</p>
          <p className="font-semibold text-text-primary">{order.customerName} {order.customerSurname}</p>
          <p className="text-xs text-text-secondary">{formatOrderDate(order.createdAt)}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={order.status} />
          <p className="font-bold text-primary">{formatPrice(order.total)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-text-secondary">
        <span>{order.deliveryType === 'pickup' ? '🏪 Ritiro' : '🛵 Consegna'}</span>
        <span>·</span>
        <span>{order.deliveryTime === 'asap' ? 'Prima possibile' : `Ore ${order.deliveryTime}`}</span>
        <span>·</span>
        <span>{order.paymentMethod === 'cash' ? '💵 Contanti' : '💳 Carta'}</span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={`tel:${order.customerPhone}`}
          className="flex items-center gap-1 px-3 py-1.5 bg-surface-alt rounded-xl text-sm font-medium text-text-primary active:scale-95 transition-all"
        >
          <Phone size={14} />
          {order.customerPhone}
        </a>
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-auto flex items-center gap-1 text-xs text-text-secondary"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Nascondi' : 'Dettagli'}
        </button>
      </div>

      {expanded && order.items && (
        <div className="border-t border-border pt-3 space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <p className="font-medium text-text-primary">{item.productName} x{item.quantity}</p>
                <p className="text-xs text-text-secondary">{item.variantName}</p>
                {item.selectedFlavors.length > 0 && (
                  <p className="text-xs text-primary">{item.selectedFlavors.join(', ')}</p>
                )}
                {item.hasCream && <p className="text-xs text-text-secondary">+ Panna</p>}
              </div>
              <p className="font-semibold text-primary">{formatPrice(item.totalPrice)}</p>
            </div>
          ))}
          {order.notes && (
            <p className="text-xs text-text-secondary italic bg-surface-alt p-2 rounded-lg">📝 {order.notes}</p>
          )}
        </div>
      )}

      {nextStatus && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onStatusChange(order.id, 'cancelled')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-red-200 text-red-600 bg-red-50 active:scale-95 transition-all"
          >
            Annulla
          </button>
          <button
            onClick={() => onStatusChange(order.id, nextStatus)}
            className="flex-1 px-3 py-1.5 rounded-xl text-sm font-semibold bg-primary text-white active:scale-95 transition-all"
          >
            {NEXT_LABEL[order.status]}
          </button>
        </div>
      )}
    </div>
  );
}
