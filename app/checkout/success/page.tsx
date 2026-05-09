'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOrderStore } from '@/lib/store/orderStore';
import { buildWhatsAppOrderMessage, formatPrice } from '@/lib/utils';
import { BUSINESS_CONFIG } from '@/lib/constants';

export default function SuccessPage() {
  const router = useRouter();
  const { currentOrder, clearOrder } = useOrderStore();

  useEffect(() => {
    if (!currentOrder) {
      router.replace('/');
    }
  }, [currentOrder, router]);

  if (!currentOrder) return null;

  const whatsappUrl = buildWhatsAppOrderMessage(
    currentOrder.orderNumber,
    `${currentOrder.customerName} ${currentOrder.customerSurname}`
  );

  const shareText = encodeURIComponent(
    `Ho ordinato da Gelateria Vernaci! 🍦✨\nIl miglior gelato artigianale!\n#GelateriaVernaci`
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start pt-12 px-4 pb-12">
      {/* Success animation */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-5xl">
          ✅
        </div>
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
          Ordine Ricevuto!
        </h1>
        <p className="text-text-secondary">
          Grazie {currentOrder.customerName}! Il tuo ordine è in preparazione.
        </p>
      </div>

      {/* Order number */}
      <div className="card w-full max-w-sm mb-4 text-center">
        <p className="text-sm text-text-secondary mb-1">Numero ordine</p>
        <p className="font-heading text-2xl font-bold text-primary tracking-wide">
          {currentOrder.orderNumber}
        </p>
        <p className="text-xs text-text-secondary mt-1">Conserva questo numero per il ritiro</p>
      </div>

      {/* Order summary card */}
      <div className="card w-full max-w-sm mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Tipo di ordine</span>
          <span className="font-medium capitalize">
            {currentOrder.deliveryType === 'pickup' ? '🏪 Ritiro in sede' : '🛵 Consegna a domicilio'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Pagamento</span>
          <span className="font-medium">
            {currentOrder.paymentMethod === 'cash' ? '💵 Contanti' : '💳 Carta'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Orario</span>
          <span className="font-medium">
            {currentOrder.deliveryTime === 'asap' ? '⏱ Prima possibile' : `🕒 ${currentOrder.deliveryTime}`}
          </span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-semibold">Totale</span>
          <span className="font-bold text-primary text-lg">
            {formatPrice(currentOrder.total)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full max-w-sm space-y-3">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-green-500 text-white font-semibold active:scale-95 transition-transform"
        >
          <span className="text-xl">💬</span>
          <span>Apri WhatsApp</span>
        </a>

        {/* Track order */}
        <Link
          href={`/track?order=${currentOrder.orderNumber}&phone=${currentOrder.customerPhone}`}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border-2 border-primary text-primary font-semibold active:scale-95 transition-transform"
        >
          <span>🔍</span>
          <span>Traccia il tuo ordine</span>
        </Link>

        {/* Share */}
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-text-secondary text-sm font-medium active:opacity-70"
        >
          <span>📤</span>
          <span>Condividi la tua scelta</span>
        </a>

        {/* Review */}
        <a
          href={BUSINESS_CONFIG.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-text-secondary text-sm font-medium active:opacity-70"
        >
          <span>⭐</span>
          <span>Lascia una recensione su Google</span>
        </a>

        {/* Home */}
        <button
          onClick={() => {
            clearOrder();
            router.push('/');
          }}
          className="w-full py-3 text-sm text-text-secondary font-medium active:opacity-70"
        >
          Torna alla Home
        </button>
      </div>
    </div>
  );
}
