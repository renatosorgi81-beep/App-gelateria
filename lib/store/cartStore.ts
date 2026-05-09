'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant, Extra } from '@/types';
import { computeCartItemPrice } from '@/lib/utils';

interface CartState {
  items: CartItem[];
  addItem: (
    product: Product,
    variant: ProductVariant,
    flavors: string[],
    extras: Extra[],
    hasCream: boolean,
    quantity: number,
    notes?: string,
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

function generateCartId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, flavors, extras, hasCream, quantity, notes) => {
        const unitPrice = computeCartItemPrice({
          product,
          selectedVariant: variant,
          selectedFlavors: flavors,
          selectedExtras: extras,
          hasCream,
          quantity,
          cartItemId: '',
          notes,
        });
        const newItem: CartItem = {
          cartItemId: generateCartId(),
          product,
          selectedVariant: variant,
          selectedFlavors: flavors,
          selectedExtras: extras,
          hasCream,
          quantity,
          notes,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        set((state) => ({ items: [...state.items, newItem] }));
      },

      removeItem: (cartItemId) => {
        set((state) => ({ items: state.items.filter((i) => i.cartItemId !== cartItemId) }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(cartItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
              : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () => get().items.reduce((sum, item) => sum + item.totalPrice, 0),
    }),
    { name: 'vernaci-cart' },
  ),
);
