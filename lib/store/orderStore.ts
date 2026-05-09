'use client';

import { create } from 'zustand';
import type { CheckoutData, Order } from '@/types';

interface OrderState {
  checkoutData: Partial<CheckoutData>;
  currentOrder: Order | null;
  setCheckoutData: (data: Partial<CheckoutData>) => void;
  setCurrentOrder: (order: Order) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>()((set) => ({
  checkoutData: {},
  currentOrder: null,

  setCheckoutData: (data) =>
    set((state) => ({
      checkoutData: { ...state.checkoutData, ...data },
    })),

  setCurrentOrder: (order) => set({ currentOrder: order }),

  clearOrder: () => set({ checkoutData: {}, currentOrder: null }),
}));
