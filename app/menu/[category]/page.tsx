import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import ProductCard from '@/components/menu/ProductCard';
import { PRODUCTS, CATEGORY_CONFIG, SUBCATEGORY_LABELS } from '@/lib/constants';
import type { ProductCategory } from '@/types';

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return [{ category: 'gelateria' }, { category: 'graniteria' }];
}

export default function CategoryPage({ params }: Props) {
  const category = params.category as ProductCategory;

  if (!CATEGORY_CONFIG[category]) {
    notFound();
  }

  const config = CATEGORY_CONFIG[category];
  const products = PRODUCTS.filter((p) => p.category === category);

  // Group by subcategory
  const grouped = products.reduce<Record<string, typeof products>>((acc, product) => {
    const sub = product.subcategory;
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title={config.label} showBack />

      <main className="flex-1 pb-24">
        {/* Category hero */}
        <div
          className={`px-4 pt-6 pb-8 ${
            category === 'gelateria'
              ? 'bg-gradient-to-br from-primary to-primary-light'
              : 'bg-gradient-to-br from-accent-dark to-accent'
          }`}
        >
          <div className="text-center">
            <div className="text-5xl mb-2">{config.emoji}</div>
            <h1 className="font-heading text-2xl font-bold text-white">{config.label}</h1>
            <p className="text-white/80 text-sm mt-1">{config.description}</p>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-6">
          {Object.entries(grouped).map(([subcategory, subcategoryProducts]) => (
            <section key={subcategory}>
              <h2 className="font-heading text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                {SUBCATEGORY_LABELS[subcategory] || subcategory}
              </h2>
              <div className="space-y-3">
                {subcategoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
