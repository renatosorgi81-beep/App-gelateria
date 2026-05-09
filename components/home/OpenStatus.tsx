'use client';

import { Clock } from 'lucide-react';
import { getOpenStatusText } from '@/lib/utils';
import { BUSINESS_CONFIG } from '@/lib/constants';

export default function OpenStatus() {
  const { open, text } = getOpenStatusText();

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${open ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${open ? 'bg-green-100' : 'bg-red-100'}`}>
        <Clock size={16} className={open ? 'text-green-600' : 'text-red-500'} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${open ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
          <span className={`text-sm font-semibold ${open ? 'text-green-700' : 'text-red-600'}`}>{text}</span>
        </div>
        <p className="text-xs text-text-secondary mt-0.5">
          Orario: {BUSINESS_CONFIG.openHours.openTime} – {BUSINESS_CONFIG.openHours.closeTime} tutti i giorni
        </p>
      </div>
    </div>
  );
}
