'use client';

import { formatPrice } from '@/lib/utils';
import type { Extra } from '@/types';

interface ExtraSelectorProps {
  extras: Extra[];
  selected: Extra[];
  onChange: (extras: Extra[]) => void;
}

export default function ExtraSelector({ extras, selected, onChange }: ExtraSelectorProps) {
  const toggle = (extra: Extra) => {
    if (selected.find((e) => e.id === extra.id)) {
      onChange(selected.filter((e) => e.id !== extra.id));
    } else {
      onChange([...selected, extra]);
    }
  };

  return (
    <div className="space-y-2">
      {extras.map((extra) => {
        const isSelected = !!selected.find((e) => e.id === extra.id);
        return (
          <button
            key={extra.id}
            onClick={() => toggle(extra)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all active:scale-[0.98] ${
              isSelected ? 'border-primary bg-primary-50' : 'border-border bg-white hover:border-primary/30'
            }`}
          >
            <span className={`text-sm ${isSelected ? 'text-primary font-medium' : 'text-text-primary'}`}>
              {extra.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">
                {extra.price > 0 ? `+${formatPrice(extra.price)}` : 'Gratis'}
              </span>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                isSelected ? 'border-primary bg-primary' : 'border-border'
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
