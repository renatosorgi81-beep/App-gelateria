'use client';

import { formatPrice } from '@/lib/utils';
import type { ProductVariant } from '@/types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: ProductVariant | null;
  onChange: (variant: ProductVariant) => void;
}

export default function VariantSelector({ variants, selected, onChange }: VariantSelectorProps) {
  return (
    <div className="space-y-2">
      {variants.map((variant) => {
        const isSelected = selected?.id === variant.id;
        return (
          <button
            key={variant.id}
            onClick={() => onChange(variant)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all active:scale-[0.98] ${
              isSelected
                ? 'border-primary bg-primary-50'
                : 'border-border bg-white hover:border-primary/40'
            }`}
          >
            <span className={`font-medium ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
              {variant.name}
            </span>
            <div className="flex items-center gap-3">
              {variant.maxFlavors > 0 && (
                <span className="text-xs text-text-secondary">{variant.maxFlavors} gusti</span>
              )}
              <span className={`font-bold ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                {formatPrice(variant.price)}
              </span>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
