'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { generateTimeSlots } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { BUSINESS_CONFIG } from '@/lib/constants';
import type { DeliveryData } from '@/types';

interface DeliveryStepProps {
  defaultValues?: Partial<DeliveryData>;
  onSubmit: (data: DeliveryData) => void;
  onBack: () => void;
}

export default function DeliveryStep({ defaultValues, onSubmit, onBack }: DeliveryStepProps) {
  const [type, setType] = useState<'pickup' | 'delivery'>(defaultValues?.type ?? 'pickup');
  const [time, setTime] = useState<string>(defaultValues?.time ?? 'asap');

  const slots = generateTimeSlots();

  const handleSubmit = () => {
    onSubmit({ type, time });
  };

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h2 className="font-heading font-bold text-text-primary mb-4">Modalità di ritiro</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setType('pickup')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              type === 'pickup' ? 'border-primary bg-primary-50' : 'border-border bg-white'
            }`}
          >
            <div className="text-2xl mb-1">🏪</div>
            <p className={`font-semibold text-sm ${type === 'pickup' ? 'text-primary' : 'text-text-primary'}`}>
              Ritiro in sede
            </p>
            <p className="text-xs text-text-secondary">Gratuito</p>
          </button>
          <button
            onClick={() => setType('delivery')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              type === 'delivery' ? 'border-primary bg-primary-50' : 'border-border bg-white'
            }`}
          >
            <div className="text-2xl mb-1">🛵</div>
            <p className={`font-semibold text-sm ${type === 'delivery' ? 'text-primary' : 'text-text-primary'}`}>
              Consegna
            </p>
            <p className="text-xs text-text-secondary">+{formatPrice(BUSINESS_CONFIG.deliveryFee)}</p>
          </button>
        </div>
      </div>

      <div className="card p-4">
        <h2 className="font-heading font-bold text-text-primary mb-4">Quando?</h2>
        <div className="space-y-2">
          <button
            onClick={() => setTime('asap')}
            className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
              time === 'asap' ? 'border-primary bg-primary-50' : 'border-border bg-white'
            }`}
          >
            <span className="text-xl">⚡</span>
            <div>
              <p className={`font-semibold text-sm ${time === 'asap' ? 'text-primary' : 'text-text-primary'}`}>
                Prima possibile
              </p>
              <p className="text-xs text-text-secondary">~20-30 minuti</p>
            </div>
            {time === 'asap' && <span className="ml-auto text-primary">✓</span>}
          </button>

          {slots.length > 0 && (
            <div>
              <p className="text-xs text-text-secondary font-medium px-1 mt-3 mb-2">Orario programmato</p>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot.value}
                    onClick={() => setTime(slot.value)}
                    className={`py-2 rounded-xl text-sm font-medium transition-all ${
                      time === slot.value
                        ? 'bg-primary text-white'
                        : 'bg-surface-alt text-text-secondary border border-border'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">← Indietro</Button>
        <Button variant="primary" onClick={handleSubmit} className="flex-1">Avanti →</Button>
      </div>
    </div>
  );
}
