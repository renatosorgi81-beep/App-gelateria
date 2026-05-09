'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, ShoppingBag, Clock } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/menu', label: 'Menu', Icon: Menu },
  { href: '/cart', label: 'Carrello', Icon: ShoppingBag },
  { href: '/track', label: 'Ordini', Icon: Clock },
];

export default function BottomNav() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-bottom-nav z-40 safe-bottom">
      <div className="flex items-stretch max-w-lg mx-auto">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          const isCart = href === '/cart';
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors',
                active ? 'text-primary' : 'text-text-secondary',
                isCart && active ? 'text-primary' : '',
              )}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                {isCart && count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </span>
              <span className={cn('text-[10px] font-medium', active ? 'font-semibold' : '')}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
