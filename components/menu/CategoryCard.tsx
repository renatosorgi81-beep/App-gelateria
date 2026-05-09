import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CategoryConfig {
  label: string;
  description: string;
  emoji: string;
  color: string;
}

interface CategoryCardProps {
  categoryKey: 'gelateria' | 'graniteria';
  config: CategoryConfig;
}

export default function CategoryCard({ categoryKey, config }: CategoryCardProps) {
  const isGelateria = categoryKey === 'gelateria';
  return (
    <Link
      href={`/menu/${categoryKey}`}
      className="block card p-5 active:scale-95 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 ${isGelateria ? 'bg-primary-50' : 'bg-accent/10'}`}>
          {config.emoji}
        </div>
        <div className="flex-1">
          <h2 className="font-heading text-xl font-bold text-text-primary">{config.label}</h2>
          <p className="text-sm text-text-secondary mt-0.5">{config.description}</p>
        </div>
        <ChevronRight size={20} className="text-text-secondary group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
    </Link>
  );
}
