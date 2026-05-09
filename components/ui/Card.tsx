import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'bordered';
}

export default function Card({ variant = 'default', className, children, ...props }: CardProps) {
  const variants = {
    default: 'bg-white rounded-2xl shadow-card',
    flat: 'bg-surface-alt rounded-2xl',
    bordered: 'bg-white rounded-2xl border border-border',
  };
  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
