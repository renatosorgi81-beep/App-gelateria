'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCartStore } from '@/lib/store/cartStore';
import { BUSINESS_CONFIG } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header title="Carrello" showBack={false} />
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-24">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="font-heading text-xl font-bold text-text-primary mb-2">
              Il carrello è vuoto
            </h2>
            <p className="text-text-secondary text-sm mb-6">
              Aggiungi qualcosa di delizioso dal nostro menu!
            </p>
            <Link href="/menu" className="btn-primary inline-flex items-center justify-center px-8">
              Vai al Menu
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const deliveryFee = BUSINESS_CONFIG.deliveryFee;
  const belowMinOrder = subtotal < BUSINESS_CONFIG.minOrderDelivery;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Carrello" showBack={false} />

      <main className="flex-1 pb-32 px-4 pt-4">
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <CartItem key={item.cartItemId} item={item} />
          ))}
        </div>

        <Link
          href="/menu"
          className="flex items-center gap-2 text-primary text-sm font-medium mb-6 active:opacity-70"
        >
          <span>+</span> Aggiungi altri prodotti
        </Link>

        <CartSummary />

        {belowMinOrder && (
          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
            Ordine minimo per la consegna: {formatPrice(BUSINESS_CONFIG.minOrderDelivery)}.
            Aggiungi ancora {formatPrice(BUSINESS_CONFIG.minOrderDelivery - subtotal)} per la consegna a domicilio.
          </div>
        )}
      </main>

      {/* Checkout CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-3 safe-bottom z-30">
        <button
          onClick={() => router.push('/checkout')}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <span>Procedi all'ordine</span>
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
}
