'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import VariantSelector from '@/components/product/VariantSelector';
import FlavorSelector from '@/components/product/FlavorSelector';
import ExtraSelector from '@/components/product/ExtraSelector';
import CreamToggle from '@/components/product/CreamToggle';
import { PRODUCTS, EXTRAS, GELATO_FLAVORS, GRANITA_FLAVORS } from '@/lib/constants';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice, computeCartItemPrice } from '@/lib/utils';
import type { ProductVariant, Extra } from '@/types';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const product = PRODUCTS.find((p) => p.id === params.id);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] ?? null
  );
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [hasCream, setHasCream] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header title="Prodotto" showBack />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Prodotto non trovato.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  const maxFlavors = selectedVariant?.maxFlavors ?? 0;
  const availableFlavors = product.flavorType === 'granita' ? GRANITA_FLAVORS : GELATO_FLAVORS;

  const unitPrice = selectedVariant
    ? computeCartItemPrice({
        product,
        selectedVariant,
        selectedFlavors,
        selectedExtras,
        hasCream,
        quantity,
        cartItemId: '',
      })
    : 0;

  const totalPrice = unitPrice * quantity;

  const canAdd =
    selectedVariant !== null &&
    (maxFlavors === 0 || selectedFlavors.length > 0);

  function handleAddToCart(): void {
    if (!selectedVariant || !canAdd) return;
    addItem(product!, selectedVariant, selectedFlavors, selectedExtras, hasCream, quantity, notes || undefined);
    setAdded(true);
    setTimeout(() => {
      router.back();
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title={product.name} showBack />

      <main className="flex-1 pb-32 overflow-y-auto">
        {/* Product header */}
        <div
          className={`px-4 pt-8 pb-10 text-center ${
            product.category === 'gelateria'
              ? 'bg-gradient-to-b from-primary/10 to-background'
              : 'bg-gradient-to-b from-accent/10 to-background'
          }`}
        >
          <div className="text-7xl mb-3">{product.emoji}</div>
          <h1 className="font-heading text-2xl font-bold text-text-primary">{product.name}</h1>
          <p className="text-text-secondary text-sm mt-2 max-w-xs mx-auto">{product.description}</p>
          {product.tags && product.tags.length > 0 && (
            <div className="flex gap-2 justify-center mt-3">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 space-y-5 pt-2">
          {/* Variant */}
          <VariantSelector
            variants={product.variants}
            selected={selectedVariant}
            onChange={(v) => {
              setSelectedVariant(v);
              setSelectedFlavors((prev) => prev.slice(0, v.maxFlavors));
            }}
          />

          {/* Flavors */}
          {maxFlavors > 0 && (
            <FlavorSelector
              flavors={availableFlavors}
              selected={selectedFlavors}
              maxFlavors={maxFlavors}
              onChange={setSelectedFlavors}
            />
          )}

          {/* Extras */}
          {product.allowExtras && (
            <ExtraSelector
              extras={EXTRAS}
              selected={selectedExtras}
              onChange={setSelectedExtras}
            />
          )}

          {/* Cream */}
          {product.allowCream && (
            <CreamToggle value={hasCream} onChange={setHasCream} />
          )}

          {/* Notes */}
          <div className="card">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Note (opzionale)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergie, preferenze particolari..."
              className="input-field resize-none h-20 text-sm"
              maxLength={200}
            />
          </div>

          {/* Quantity */}
          <div className="card flex items-center justify-between">
            <span className="font-semibold text-text-primary">Quantità</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center text-text-primary font-bold text-lg active:scale-95 transition-transform"
              >
                −
              </button>
              <span className="font-bold text-lg w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky add to cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-3 safe-bottom z-30">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-text-secondary">Totale</p>
            <p className="font-heading text-xl font-bold text-primary">{formatPrice(totalPrice)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!canAdd || added}
            className={`flex-1 py-3.5 rounded-2xl font-semibold text-white transition-all duration-200 active:scale-95 disabled:opacity-50 ${
              added ? 'bg-green-500' : 'bg-primary'
            }`}
          >
            {added ? '✓ Aggiunto!' : 'Aggiungi al carrello'}
          </button>
        </div>
      </div>
    </div>
  );
}
