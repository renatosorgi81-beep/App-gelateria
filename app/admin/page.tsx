'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import OrderTable from '@/components/admin/OrderTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { formatPrice } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types';
import { createClient } from '@/lib/supabase/client';

type StatusFilter = 'all' | OrderStatus;

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'pending', label: 'In attesa' },
  { value: 'confirmed', label: 'Confermati' },
  { value: 'ready', label: 'Pronti' },
  { value: 'delivered', label: 'Consegnati' },
  { value: 'cancelled', label: 'Annullati' },
];

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [dateFilter, setDateFilter] = useState<string>(new Date().toISOString().slice(0, 10));
  const [adminPassword, setAdminPassword] = useState<string>('');

  useEffect(() => {
    const storedPassword = sessionStorage.getItem('adminAuth');
    if (!storedPassword) {
      router.replace('/admin/login');
      return;
    }
    setAdminPassword(storedPassword);
  }, [router]);

  const fetchOrders = useCallback(async () => {
    if (!adminPassword) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ date: dateFilter });
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/admin/orders?${params.toString()}`, {
        headers: { 'x-admin-password': adminPassword },
      });
      const json = await res.json();
      if (res.ok) {
        setOrders(json.orders ?? []);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  }, [adminPassword, statusFilter, dateFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Realtime subscription
  useEffect(() => {
    if (!adminPassword) return;
    const supabase = createClient();
    const channel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [adminPassword, fetchOrders]);

  async function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      await fetchOrders();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  }

  // Stats
  const todayOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  if (!adminPassword) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-heading text-xl font-bold">🍦 Vernaci Admin</h1>
          <p className="text-white/70 text-xs">Pannello ordini</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="text-white/80 text-sm border border-white/30 rounded-lg px-3 py-1.5 active:scale-95 transition-transform"
          >
            ↻ Aggiorna
          </button>
          <button
            onClick={handleLogout}
            className="text-white/80 text-sm active:scale-95 transition-transform"
          >
            Esci
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="card text-center">
            <p className="text-3xl font-bold text-primary">{todayOrders}</p>
            <p className="text-xs text-text-secondary mt-1">Ordini oggi</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-amber-500">{pendingOrders + confirmedOrders}</p>
            <p className="text-xs text-text-secondary mt-1">Da evadere</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-green-600">
              {orders.filter((o) => o.status === 'delivered').length}
            </p>
            <p className="text-xs text-text-secondary mt-1">Consegnati</p>
          </div>
          <div className="card text-center">
            <p className="text-xl font-bold text-primary">{formatPrice(totalRevenue)}</p>
            <p className="text-xs text-text-secondary mt-1">Incasso giorno</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="input-field max-w-[180px] text-sm py-2"
          />
        </div>

        {/* Status tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                statusFilter === tab.value
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border text-text-secondary'
              }`}
            >
              {tab.label}
              {tab.value === 'pending' && pendingOrders > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 inline-flex items-center justify-center">
                  {pendingOrders}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders */}
        {loading ? (
          <div className="card text-center py-8 text-text-secondary">
            <div className="text-3xl mb-2">⏳</div>
            <p>Caricamento ordini...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="card text-center py-8 text-text-secondary">
            <div className="text-3xl mb-2">📭</div>
            <p>Nessun ordine trovato.</p>
          </div>
        ) : (
          <OrderTable orders={orders} onStatusChange={handleStatusChange} />
        )}
      </div>
    </div>
  );
}
