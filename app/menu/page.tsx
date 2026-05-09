import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import CategoryCard from '@/components/menu/CategoryCard';
import { CATEGORY_CONFIG } from '@/lib/constants';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Menu" showBack={false} />

      <main className="flex-1 pb-24 px-4 pt-4">
        <div className="mb-6">
          <h1 className="section-title mb-1">Scegli la categoria</h1>
          <p className="text-text-secondary text-sm">Tutto fatto con passione artigianale</p>
        </div>

        <div className="space-y-4">
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <CategoryCard
              key={key}
              categoryKey={key as 'gelateria' | 'graniteria'}
              config={config}
            />
          ))}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
          <p className="text-sm text-text-secondary">
            Tutti i nostri prodotti sono preparati artigianalmente ogni giorno con ingredienti freschi e selezionati. 🌿
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
