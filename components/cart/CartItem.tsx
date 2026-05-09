'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="card p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl flex-shrink-0">
          {item.product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-text-primary text-sm leading-tight">{item.product.name}</p>
              <p className="text-xs text-text-secondary">{item.selectedVariant.name}</p>
            </div>
            <button
              onClick={() => removeItem(item.cartItemId)}
              className="p-1.5 rounded-lg text-text-secondary hover:text-error hover:bg-red-50 transition-colors flex-shrink-0"
              aria-label="Rimuovi"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {item.selectedFlavors.length > 0 && (
            <p className="text-xs text-primary mt-1">{item.selectedFlavors.join(' · ')}</p>
          )}
          {item.hasCream && <p className="text-xs text-text-secondary">+ Panna</p>}
          {item.selectedExtras.length > 0 && (
            <p className="text-xs text-text-secondary">+ {item.selectedExtras.map((e) => e.name).join(', ')}</p>
          )}
          {item.notes && <p className="text-xs text-text-secondary italic mt-0.5">"{item.notes}"</p>}

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                className="w-7 h-7 rounded-full border border-border flex items-center justify-center active:scale-90 transition-all"
              >
                <Minus size={13} />
              </button>
              <span className="font-semibold text-sm w-5 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                className="w-7 h-7 rounded-full bg-primary-50 border border-primary/30 flex items-center justify-center active:scale-90 transition-all"
              >
                <Plus size={13} className="text-primary" />
              </button>
            </div>
            <p className="font-bold text-primary">{formatPrice(item.totalPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
