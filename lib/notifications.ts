import { Resend } from 'resend';
import type { CartItem, CheckoutData } from '@/types';

interface NotificationPayload {
  orderNumber: string;
  checkoutData: CheckoutData;
  items: CartItem[];
  total: number;
  deliveryFee: number;
}

// ─── Telegram ────────────────────────────────────────────────────────────────

function buildTelegramMessage(payload: NotificationPayload): string {
  const { orderNumber, checkoutData, items, total } = payload;
  const { customer, delivery, payment } = checkoutData;

  const itemLines = items.map((item) => {
    const flavors = item.selectedFlavors.length > 0 ? item.selectedFlavors.join(', ') : '';
    const extras = item.selectedExtras.map((e) => e.name).join(', ');
    const cream = item.hasCream ? '+ Panna' : '';
    const details = [flavors, extras, cream].filter(Boolean).join(' • ');
    return `• ${item.product.name} ${item.selectedVariant.name} x${item.quantity}${details ? `\n  ↳ ${details}` : ''}`;
  });

  const deliveryLine =
    delivery.type === 'delivery'
      ? `🚚 Consegna • ${delivery.time === 'asap' ? 'Prima possibile' : delivery.time}\n📍 ${customer.address}, ${customer.city}`
      : `🏪 Ritiro in negozio • ${delivery.time === 'asap' ? 'Prima possibile' : delivery.time}`;

  const paymentLabel = payment.method === 'cash' ? 'Contanti' : 'Carta';
  const notesLine = checkoutData.notes ? `\n📝 Note: ${checkoutData.notes}` : '';

  return [
    `🍦 *NUOVO ORDINE — ${orderNumber}*`,
    '',
    `👤 ${customer.name} ${customer.surname}`,
    `📞 ${customer.phone}`,
    '',
    `🛒 *Ordine:*`,
    ...itemLines,
    '',
    deliveryLine,
    `💵 ${paymentLabel} • Totale *€${total.toFixed(2)}*`,
    notesLine,
  ]
    .filter((line) => line !== undefined)
    .join('\n');
}

export async function sendTelegramNotification(payload: NotificationPayload): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) return;

  const message = buildTelegramMessage(payload);

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Telegram notification failed:', err);
  }
}

// ─── Email (Resend) ───────────────────────────────────────────────────────────

function buildEmailHtml(payload: NotificationPayload): string {
  const { orderNumber, checkoutData, items, total, deliveryFee } = payload;
  const { customer, delivery, payment } = checkoutData;
  const subtotal = total - deliveryFee;

  const itemRows = items
    .map((item) => {
      const flavors = item.selectedFlavors.length > 0 ? `<br><small>${item.selectedFlavors.join(', ')}</small>` : '';
      const extras = item.selectedExtras.length > 0 ? `<br><small>Extra: ${item.selectedExtras.map((e) => e.name).join(', ')}</small>` : '';
      const cream = item.hasCream ? `<br><small>+ Panna €0.30</small>` : '';
      return `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">
            ${item.product.name} — ${item.selectedVariant.name} x${item.quantity}
            ${flavors}${extras}${cream}
          </td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">
            €${item.totalPrice.toFixed(2)}
          </td>
        </tr>`;
    })
    .join('');

  const deliveryInfo =
    delivery.type === 'delivery'
      ? `Consegna a domicilio — ${delivery.time === 'asap' ? 'Prima possibile' : delivery.time}<br>${customer.address}, ${customer.city}`
      : `Ritiro in negozio — ${delivery.time === 'asap' ? 'Prima possibile' : delivery.time}`;

  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a2e;">
  <div style="background:#1B4332;padding:20px;border-radius:12px;text-align:center;margin-bottom:24px;">
    <h1 style="color:#fff;margin:0;font-size:22px;">🍦 Nuovo Ordine Gelateria Vernaci</h1>
    <p style="color:#D4A843;margin:8px 0 0;font-size:18px;font-weight:bold;">${orderNumber}</p>
  </div>

  <div style="background:#f5f0e8;padding:16px;border-radius:8px;margin-bottom:16px;">
    <h3 style="margin:0 0 8px;color:#1B4332;">👤 Cliente</h3>
    <p style="margin:0;">${customer.name} ${customer.surname}</p>
    <p style="margin:4px 0;">📞 <a href="tel:${customer.phone}">${customer.phone}</a></p>
  </div>

  <div style="background:#f5f0e8;padding:16px;border-radius:8px;margin-bottom:16px;">
    <h3 style="margin:0 0 8px;color:#1B4332;">🚚 Consegna</h3>
    <p style="margin:0;">${deliveryInfo}</p>
    <p style="margin:4px 0;">💵 Pagamento: ${payment.method === 'cash' ? 'Contanti' : 'Carta'}</p>
  </div>

  <div style="margin-bottom:16px;">
    <h3 style="color:#1B4332;">🛒 Prodotti ordinati</h3>
    <table style="width:100%;border-collapse:collapse;">
      <tbody>${itemRows}</tbody>
    </table>
    <table style="width:100%;margin-top:8px;">
      <tr><td>Subtotale</td><td style="text-align:right;">€${subtotal.toFixed(2)}</td></tr>
      ${deliveryFee > 0 ? `<tr><td>Supplemento consegna</td><td style="text-align:right;">€${deliveryFee.toFixed(2)}</td></tr>` : ''}
      <tr style="font-weight:bold;font-size:16px;color:#1B4332;">
        <td>TOTALE DA PAGARE</td>
        <td style="text-align:right;">€${total.toFixed(2)}</td>
      </tr>
    </table>
  </div>

  ${checkoutData.notes ? `<div style="background:#fff3cd;padding:12px;border-radius:8px;margin-bottom:16px;"><strong>📝 Note:</strong> ${checkoutData.notes}</div>` : ''}

  <div style="text-align:center;margin-top:24px;">
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin"
       style="background:#1B4332;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
      Gestisci ordine nel pannello admin
    </a>
  </div>

  <p style="text-align:center;color:#999;font-size:12px;margin-top:24px;">
    Gelateria Vernaci — Notifica automatica
  </p>
</body>
</html>`;
}

export async function sendEmailNotification(payload: NotificationPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL;
  const fromEmail = process.env.NOTIFICATION_FROM_EMAIL ?? 'ordini@vernaci.it';

  if (!apiKey || !toEmail) return;

  const resend = new Resend(apiKey);
  const { customer } = payload.checkoutData;

  const { error } = await resend.emails.send({
    from: `Gelateria Vernaci <${fromEmail}>`,
    to: [toEmail],
    subject: `🍦 Nuovo ordine ${payload.orderNumber} — ${customer.name} ${customer.surname}`,
    html: buildEmailHtml(payload),
  });

  if (error) {
    console.error('Email notification failed:', error);
  }
}

// ─── Send all notifications ───────────────────────────────────────────────────

export async function sendOrderNotifications(payload: NotificationPayload): Promise<void> {
  await Promise.allSettled([
    sendTelegramNotification(payload),
    sendEmailNotification(payload),
  ]);
}
