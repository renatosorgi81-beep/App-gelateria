'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import type { PaymentData } from '@/types';

interface PaymentStepProps {
  defaultValues?: Partial<PaymentData>;
  onSubmit: (data: PaymentData) => void;
  onBack: () => void;
}

export default function PaymentStep({ defaultValues, onSubmit, onBack }: PaymentStepProps) {
  const [method, setMethod] = useState<'cash' | 'card'>(defaultValues?.method ?? 'cash');

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h2 className="font-heading font-bold text-text-primary mb-4">Metodo di pagamento</h2>
        <p className="text-sm text-text-secondary mb-4">Il pagamento avviene al momento del ritiro o della consegna.</p>

        <div className="space-y-3">
          <button
            onClick={() => setMethod('cash')}
            className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all text-left ${
              method === 'cash' ? 'border-primary bg-primary-50' : 'border-border bg-white'
            }`}
          >
            <span className="text-2xl">💵</span>
            <div>
              <p className={`font-semibold ${method === 'cash' ? 'text-primary' : 'text-text-primary'}`}>Contanti</p>
              <p className="text-xs text-text-secondary">Paga al ritiro / consegna</p>
            </div>
            {method === 'cash' && <span className="ml-auto text-primary font-bold">✓</span>}
          </button>

          <button
            onClick={() => setMethod('card')}
            className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all text-left ${
              method === 'card' ? 'border-primary bg-primary-50' : 'border-border bg-white'
            }`}
          >
            <span className="text-2xl">💳</span>
            <div>
              <p className={`font-semibold ${method === 'card' ? 'text-primary' : 'text-text-primary'}`}>Carta</p>
              <p className="text-xs text-text-secondary">POS disponibile al ritiro / consegna</p>
            </div>
            {method === 'card' && <span className="ml-auto text-primary font-bold">✓</span>}
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">← Indietro</Button>
        <Button variant="primary" onClick={() => onSubmit({ method })} className="flex-1">Avanti →</Button>
      </div>
    </div>
  );
}
