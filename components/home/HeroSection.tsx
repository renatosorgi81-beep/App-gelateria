'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

export default function HeroSection() {
  return (
    <div className="relative bg-primary overflow-hidden px-6 pt-12 pb-10">
      {/* Decorative background icons */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-10">
        <span className="absolute top-4 right-6 text-7xl">🍦</span>
        <span className="absolute bottom-4 left-6 text-5xl">🧊</span>
        <span className="absolute top-16 left-1/2 -translate-x-1/2 text-4xl">🥐</span>
      </div>

      <div className="relative z-10">
        <p className="text-primary-50 text-sm font-medium mb-1">Benvenuto da</p>
        <h1 className="font-heading text-3xl font-bold text-white leading-tight mb-2">
          Gelateria Vernaci
        </h1>
        <p className="text-primary-50 text-sm mb-6">{BUSINESS_CONFIG.tagline}</p>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-5 py-3 rounded-2xl active:scale-95 transition-all shadow-lg"
        >
          <ShoppingBag size={18} />
          Inizia il tuo ordine
        </Link>
      </div>
    </div>
  );
}
