'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { BUSINESS_CONFIG } from '@/lib/constants';

export default function CartSummary() {
  const subtotal = useCartStore((s) => s.subtotal());
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');

  const deliveryFee = deliveryType === 'delivery' ? BUSINESS_CONFIG.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-heading font-semibold text-text-primary">Riepilogo</h3>

      <div className="flex gap-2">
        <button
          onClick={() => setDeliveryType('pickup')}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
            deliveryType === 'pickup' ? 'bg-primary text-white' : 'bg-surface-alt text-text-secondary'
          }`}
        >
          🏪 Ritiro
        </button>
        <button
          onClick={() => setDeliveryType('delivery')}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
            deliveryType === 'delivery' ? 'bg-primary text-white' : 'bg-surface-alt text-text-secondary'
          }`}
        >
          🛵 Consegna
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotale prodotti</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Consegna</span>
          <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'Gratuito'}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-bold text-text-primary text-base">
          <span>Totale da pagare</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
