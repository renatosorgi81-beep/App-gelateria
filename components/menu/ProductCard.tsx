import Link from 'next/link';
import { Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const maxPrice = Math.max(...product.variants.map((v) => v.price));
  const priceLabel = minPrice === maxPrice ? formatPrice(minPrice) : `da ${formatPrice(minPrice)}`;

  return (
    <Link
      href={`/product/${product.id}`}
      className="card p-4 flex items-center gap-4 active:scale-95 transition-all group"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-3xl flex-shrink-0">
        {product.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-text-primary">{product.name}</h3>
          {product.tags?.includes('popolare') && (
            <span className="text-[10px] bg-accent/20 text-accent-dark px-1.5 py-0.5 rounded-full font-medium">Popolare</span>
          )}
          {product.tags?.includes('specialita') && (
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">Specialità</span>
          )}
        </div>
        <p className="text-xs text-text-secondary mt-0.5 truncate">{product.description}</p>
        {product.variants.length > 1 && (
          <p className="text-xs text-text-secondary mt-0.5">{product.variants.length} varianti</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <p className="font-bold text-primary text-sm">{priceLabel}</p>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Plus size={16} className="text-white" />
        </div>
      </div>
    </Link>
  );
}
