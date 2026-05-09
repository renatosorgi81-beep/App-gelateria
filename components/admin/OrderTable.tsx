'use client';

import OrderCard from './OrderCard';
import type { Order, OrderStatus } from '@/types';

interface OrderTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

export default function OrderTable({ orders, onStatusChange }: OrderTableProps) {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
