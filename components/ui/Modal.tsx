'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto', className)}>
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-white z-10">
          {title && <h2 className="font-heading text-lg font-bold text-text-primary">{title}</h2>}
          <button onClick={onClose} className="ml-auto p-2 rounded-xl text-text-secondary hover:bg-surface-alt transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
