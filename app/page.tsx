import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import HeroSection from '@/components/home/HeroSection';
import OpenStatus from '@/components/home/OpenStatus';
import QuickActions from '@/components/home/QuickActions';
import { BUSINESS_CONFIG } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Gelateria Vernaci" showBack={false} />

      <main className="flex-1 pb-24">
        <HeroSection />
        <div className="px-4 space-y-4 mt-4">
          <OpenStatus />
          <QuickActions />

          {/* Loyalty Teaser */}
          <div className="card border border-accent/30 bg-gradient-to-r from-accent/10 to-transparent">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-semibold text-text-primary text-sm">Raccolta Punti Fedeltà</p>
                <p className="text-xs text-text-secondary">Presto disponibile — resta aggiornato!</p>
              </div>
              <span className="ml-auto text-xs bg-accent/20 text-accent-dark px-2 py-1 rounded-full font-medium">
                Presto
              </span>
            </div>
          </div>

          {/* WhatsApp subscribe */}
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                💬
              </div>
              <div className="flex-1">
                <p className="font-semibold text-text-primary text-sm">Offerte Esclusive</p>
                <p className="text-xs text-text-secondary">Iscriviti per promozioni via WhatsApp</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Ciao! Voglio iscrivermi alle offerte esclusive di Gelateria Vernaci 🍦')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 bg-green-500 text-white text-sm font-semibold py-2.5 rounded-xl active:scale-95 transition-transform"
            >
              <span>Iscriviti su WhatsApp</span>
            </a>
          </div>

          {/* Info card */}
          <div className="card text-center text-sm text-text-secondary space-y-1 pb-2">
            <p className="font-medium text-text-primary">📍 {BUSINESS_CONFIG.address}</p>
            <p>📞 {BUSINESS_CONFIG.phone}</p>
            <p>🕒 Aperto tutti i giorni {BUSINESS_CONFIG.openHours.openTime} – {BUSINESS_CONFIG.openHours.closeTime}</p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
