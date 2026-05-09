'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import ConsentSection from './ConsentSection';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { BUSINESS_CONFIG } from '@/lib/constants';
import type { CheckoutData, ConsentData } from '@/types';

interface SummaryStepProps {
  checkoutData: Partial<CheckoutData>;
  onSubmit: (data: { consent: ConsentData; notes?: string }) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
  error?: string | null;
}

export default function SummaryStep({ checkoutData, onSubmit, onBack, isSubmitting, error }: SummaryStepProps) {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const [consent, setConsent] = useState<ConsentData>({ gdprConsent: false, marketingConsent: false, whatsappConsent: false });
  const [notes, setNotes] = useState('');

  const deliveryFee = checkoutData.delivery?.type === 'delivery' ? BUSINESS_CONFIG.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  const { customer, delivery, payment } = checkoutData;

  const handleSubmit = async () => {
    if (!consent.gdprConsent) return;
    await onSubmit({ consent, notes: notes || undefined });
  };

  return (
    <div className="space-y-4">
      {/* Customer info */}
      <div className="card p-4 space-y-2">
        <h3 className="font-heading font-semibold text-text-primary">Dati personali</h3>
        <p className="text-sm text-text-secondary">{customer?.name} {customer?.surname}</p>
        <p className="text-sm text-text-secondary">📞 {customer?.phone}</p>
        {customer?.address && <p className="text-sm text-text-secondary">📍 {customer.address}{customer.city ? `, ${customer.city}` : ''}</p>}
      </div>

      {/* Delivery & payment */}
      <div className="card p-4 space-y-2">
        <h3 className="font-heading font-semibold text-text-primary">Ordine</h3>
        <p className="text-sm text-text-secondary">
          {delivery?.type === 'pickup' ? '🏪 Ritiro in sede' : '🛵 Consegna a domicilio'} ·{' '}
          {delivery?.time === 'asap' ? 'Prima possibile' : `Ore ${delivery?.time}`}
        </p>
        <p className="text-sm text-text-secondary">
          {payment?.method === 'cash' ? '💵 Contanti' : '💳 Carta'}
        </p>
      </div>

      {/* Items */}
      <div className="card p-4 space-y-3">
        <h3 className="font-heading font-semibold text-text-primary">Prodotti</h3>
        {items.map((item) => (
          <div key={item.cartItemId} className="flex justify-between items-start text-sm">
            <div>
              <p className="font-medium text-text-primary">{item.product.name} x{item.quantity}</p>
              <p className="text-xs text-text-secondary">{item.selectedVariant.name}</p>
              {item.selectedFlavors.length > 0 && (
                <p className="text-xs text-primary">{item.selectedFlavors.join(', ')}</p>
              )}
            </div>
            <p className="font-semibold text-primary flex-shrink-0 ml-2">{formatPrice(item.totalPrice)}</p>
          </div>
        ))}
        <div className="border-t border-border pt-3 space-y-1 text-sm">
          <div className="flex justify-between text-text-secondary">
            <span>Subtotale</span><span>{formatPrice(subtotal)}</span>
          </div>
          {deliveryFee > 0 && (
            <div className="flex justify-between text-text-secondary">
              <span>Consegna</span><span>{formatPrice(deliveryFee)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-text-primary text-base border-t border-border pt-2">
            <span>Totale da pagare</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="card p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-2">Note per la consegna</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Citofono, piano, istruzioni particolari..."
          rows={2}
          className="w-full border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
        />
      </div>

      {/* Consent */}
      <ConsentSection value={consent} onChange={setConsent} />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-error">{error}</div>
      )}

      {!consent.gdprConsent && (
        <p className="text-xs text-error text-center">Accetta il consenso al trattamento dati per procedere</p>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">← Indietro</Button>
        <Button
          variant="accent"
          onClick={handleSubmit}
          disabled={!consent.gdprConsent}
          loading={isSubmitting}
          className="flex-1"
        >
          Conferma ordine
        </Button>
      </div>
    </div>
  );
}
