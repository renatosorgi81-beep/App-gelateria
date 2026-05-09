'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  transparent?: boolean;
}

export default function Header({ title, showBack, backHref, transparent }: HeaderProps) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleBack = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  return (
    <header className={`sticky top-0 z-40 ${transparent ? 'bg-transparent' : 'bg-background border-b border-border'}`}>
      <div className="flex items-center justify-between px-4 h-14">
        <div className="w-10">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-xl text-text-primary hover:bg-surface-alt transition-colors"
              aria-label="Indietro"
            >
              <ArrowLeft size={22} />
            </button>
          )}
        </div>
        {title && (
          <h1 className="font-heading font-bold text-lg text-text-primary truncate flex-1 text-center px-2">
            {title}
          </h1>
        )}
        <div className="w-10 flex justify-end">
          <Link href="/cart" className="relative p-2 -mr-2 rounded-xl text-text-primary hover:bg-surface-alt transition-colors" aria-label="Carrello">
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
