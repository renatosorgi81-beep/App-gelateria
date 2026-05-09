import type { OrderStatus } from '@/types';

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: '⏳ In attesa', className: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: '✅ Confermato', className: 'bg-blue-100 text-blue-800' },
  ready: { label: '🍦 Pronto', className: 'bg-green-100 text-green-800' },
  delivered: { label: '✓ Consegnato', className: 'bg-gray-100 text-gray-600' },
  cancelled: { label: '✗ Annullato', className: 'bg-red-100 text-red-700' },
};

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.className} ${className}`}>
      {config.label}
    </span>
  );
}
