'use client';

import Link from 'next/link';
import type { ConsentData } from '@/types';

interface ConsentSectionProps {
  value: ConsentData;
  onChange: (data: ConsentData) => void;
}

export default function ConsentSection({ value, onChange }: ConsentSectionProps) {
  const update = (key: keyof ConsentData, checked: boolean) => {
    onChange({ ...value, [key]: checked });
  };

  return (
    <div className="card p-4 space-y-4">
      <h2 className="font-heading font-bold text-text-primary">Privacy e consensi</h2>

      {/* Mandatory GDPR */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value.gdprConsent}
          onChange={(e) => update('gdprConsent', e.target.checked)}
          className="mt-0.5 w-5 h-5 accent-primary flex-shrink-0"
        />
        <span className="text-sm text-text-primary">
          <span className="text-error font-medium">* </span>
          Acconsento al trattamento dei miei dati personali per la gestione dell&apos;ordine, ai sensi dell&apos;art. 6 GDPR.{' '}
          <Link href="/privacy" className="text-primary underline text-xs">Privacy Policy</Link>
        </span>
      </label>

      {/* Optional WhatsApp */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value.whatsappConsent}
          onChange={(e) => update('whatsappConsent', e.target.checked)}
          className="mt-0.5 w-5 h-5 accent-primary flex-shrink-0"
        />
        <span className="text-sm text-text-secondary">
          Acconsento a ricevere aggiornamenti sull&apos;ordine via WhatsApp. <span className="text-xs">(Opzionale)</span>
        </span>
      </label>

      {/* Optional Marketing */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value.marketingConsent}
          onChange={(e) => update('marketingConsent', e.target.checked)}
          className="mt-0.5 w-5 h-5 accent-primary flex-shrink-0"
        />
        <span className="text-sm text-text-secondary">
          Acconsento a ricevere offerte, promozioni e novità via WhatsApp/SMS da Gelateria Vernaci. <span className="text-xs">(Opzionale)</span>
        </span>
      </label>

      <p className="text-xs text-text-secondary border-t border-border pt-3">
        Titolare del trattamento: Vernaci [ragione sociale]. I tuoi dati non saranno ceduti a terzi e verranno utilizzati esclusivamente per la gestione degli ordini e, se hai prestato il consenso, per comunicazioni promozionali.
      </p>
    </div>
  );
}
