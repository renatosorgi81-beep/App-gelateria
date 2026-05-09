'use client';

import Link from 'next/link';
import { ShoppingBag, Clock, Star, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export default function QuickActions() {
  const actions = [
    { label: 'Ordina ora', sublabel: 'Scegli i tuoi gusti', icon: <ShoppingBag size={22} className="text-primary" />, href: '/menu', isLink: true },
    { label: 'I miei ordini', sublabel: 'Traccia un ordine', icon: <Clock size={22} className="text-accent-dark" />, href: '/track', isLink: true },
    { label: 'Recensiscici', sublabel: 'Su Google Maps', icon: <Star size={22} className="text-yellow-500" />, href: BUSINESS_CONFIG.googleReviewUrl, isExternal: true },
    { label: 'Contattaci', sublabel: BUSINESS_CONFIG.phone, icon: <Phone size={22} className="text-green-600" />, href: `tel:${BUSINESS_CONFIG.phone}`, isExternal: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => {
        const cls = 'card p-4 flex items-start gap-3 active:scale-95 transition-all cursor-pointer';
        const inner = (
          <>
            <div className="w-10 h-10 rounded-xl bg-surface-alt flex items-center justify-center flex-shrink-0">
              {action.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{action.label}</p>
              <p className="text-xs text-text-secondary">{action.sublabel}</p>
            </div>
          </>
        );

        if (action.isExternal) {
          return (
            <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer" className={cls}>
              {inner}
            </a>
          );
        }
        return (
          <Link key={action.label} href={action.href} className={cls}>
            {inner}
          </Link>
        );
      })}

      {/* Delivery info spanning full width */}
      <div className="col-span-2 card p-4 flex flex-col gap-2 text-sm text-text-secondary">
        <p className="font-medium text-text-primary">ℹ️ Informazioni consegna</p>
        <p>🏃 Ritiro in negozio · Gratuito</p>
        <p>🛵 Consegna a domicilio · {formatPrice(BUSINESS_CONFIG.deliveryFee)}</p>
        <p>📦 Ordine minimo · {formatPrice(BUSINESS_CONFIG.minOrderDelivery)}</p>
      </div>
    </div>
  );
}
