'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import StatusBadge from '@/components/admin/StatusBadge';
import { formatPrice, formatOrderDate } from '@/lib/utils';
import type { Order } from '@/types';

function TrackContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get('order') ?? '');
  const [phone, setPhone] = useState(searchParams.get('phone') ?? '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!orderNumber.trim() || !phone.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const res = await fetch(
        `/api/orders?orderNumber=${encodeURIComponent(orderNumber.trim())}&phone=${encodeURIComponent(phone.trim())}`
      );
      const json = await res.json();
      if (!res.ok || !json.order) {
        setOrder(null);
        setError('Ordine non trovato. Controlla il numero e il telefono.');
      } else {
        setOrder(json.order);
      }
    } catch {
      setError('Errore di connessione. Riprova.');
    } finally {
      setLoading(false);
    }
  }

  const statusMessages: Record<string, string> = {
    pending: 'Il tuo ordine è stato ricevuto e sarà presto confermato.',
    confirmed: 'Il tuo ordine è confermato e in preparazione! 🍦',
    ready: 'Il tuo ordine è pronto! Vieni a ritirarlo (o è in consegna).',
    delivered: 'Ordine consegnato. Buon appetito! 😊',
    cancelled: 'Ordine annullato. Contattaci per maggiori informazioni.',
  };

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div className="card">
        <h2 className="font-heading text-lg font-bold text-text-primary mb-4">
          Traccia il tuo ordine
        </h2>
        <form onSubmit={handleSearch} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Numero ordine
            </label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="VRN-20240101-1234"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Numero di telefono
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+39 333 1234567"
              className="input-field"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !orderNumber || !phone}
            className="btn-primary"
          >
            {loading ? 'Cerco...' : 'Cerca ordine'}
          </button>
        </form>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {order && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-secondary">Ordine</p>
              <p className="font-heading text-lg font-bold text-primary">{order.orderNumber}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          <div className="p-3 rounded-xl bg-primary/5 text-sm text-text-primary">
            {statusMessages[order.status]}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Orario ordine</span>
              <span className="font-medium">{formatOrderDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Consegna</span>
              <span className="font-medium capitalize">
                {order.deliveryType === 'pickup' ? 'Ritiro' : 'Consegna'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Orario</span>
              <span className="font-medium">
                {order.deliveryTime === 'asap' ? 'Prima possibile' : order.deliveryTime}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="font-semibold">Totale</span>
              <span className="font-bold text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Traccia Ordine" showBack />
      <main className="flex-1 pb-24">
        <Suspense fallback={<div className="p-4 text-center text-text-secondary">Caricamento...</div>}>
          <TrackContent />
        </Suspense>
      </main>
      <BottomNav />
    </div>
  );
}
