import { BUSINESS_CONFIG } from './constants';
import type { CartItem } from '@/types';

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function isBusinessOpen(): boolean {
  const now = new Date();
  const day = now.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const { days, openTime, closeTime } = BUSINESS_CONFIG.openHours;
  if (!(days as readonly number[]).includes(day)) return false;
  const [openH, openM] = openTime.split(':').map(Number);
  const [closeH, closeM] = closeTime.split(':').map(Number);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export function getOpenStatusText(): { open: boolean; text: string } {
  const open = isBusinessOpen();
  const { openTime, closeTime } = BUSINESS_CONFIG.openHours;
  return {
    open,
    text: open ? `Aperto · Chiude alle ${closeTime}` : `Chiuso · Apre alle ${openTime}`,
  };
}

export function computeCartItemPrice(item: Omit<CartItem, 'unitPrice' | 'totalPrice'>): number {
  const base = item.selectedVariant.price;
  const extrasTotal = item.selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const cream = item.hasCream ? 0.3 : 0;
  return base + extrasTotal + cream;
}

export function buildWhatsAppOrderMessage(orderNumber: string, customerName: string): string {
  const msg = `Ciao! Ho appena effettuato un ordine su Gelateria Vernaci.\nNumero ordine: ${orderNumber}\nNome: ${customerName}\n\nPuoi confermarmi l'ordine? Grazie! 🍦`;
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export function buildShareText(items: CartItem[]): string {
  const names = items.map((i) => i.product.name).join(', ');
  return `Ho appena ordinato da Gelateria Vernaci: ${names} 🍦 Il gelato artigianale più buono di Palermo! #GelateriaVernaci #Sicilia`;
}

export function formatOrderDate(dateStr: string): string {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}
