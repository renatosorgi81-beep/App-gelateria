import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateOrderNumber } from '@/lib/constants';
import { sendOrderNotifications } from '@/lib/notifications';
import type { CartItem, CheckoutData } from '@/types';

// GET — fetch a single order by orderNumber + phone (for tracking)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get('orderNumber');
  const phone = searchParams.get('phone');

  if (!orderNumber || !phone) {
    return NextResponse.json({ error: 'Missing orderNumber or phone' }, { status: 400 });
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .eq('customer_phone', phone)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = mapOrderRow(data);
    return NextResponse.json({ order });
  } catch (err) {
    console.error('Error fetching order:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST — create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      checkoutData: CheckoutData;
      items: CartItem[];
      subtotal: number;
      deliveryFee: number;
      total: number;
    };

    const { checkoutData, items, subtotal, deliveryFee, total } = body;

    // Validate required fields
    if (!checkoutData?.customer || !checkoutData?.delivery || !checkoutData?.payment) {
      return NextResponse.json({ error: 'Missing checkout data' }, { status: 400 });
    }
    if (!checkoutData.consent?.gdprConsent) {
      return NextResponse.json({ error: 'GDPR consent required' }, { status: 400 });
    }
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const { customer, delivery, payment, consent } = checkoutData;
    const orderNumber = generateOrderNumber();

    const supabase = createClient();

    // Insert order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: customer.name,
        customer_surname: customer.surname,
        customer_phone: customer.phone,
        customer_address: customer.address ?? null,
        customer_city: customer.city ?? null,
        delivery_type: delivery.type,
        delivery_time: delivery.time,
        payment_method: payment.method,
        notes: checkoutData.notes ?? null,
        status: 'pending',
        subtotal,
        delivery_fee: deliveryFee,
        total,
        whatsapp_consent: consent.whatsappConsent,
        marketing_consent: consent.marketingConsent,
        gdpr_consent: consent.gdprConsent,
      })
      .select()
      .single();

    if (orderError || !orderData) {
      console.error('Error inserting order:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Insert order items
    const orderItems = items.map((item) => ({
      order_id: orderData.id,
      product_category: item.product.category,
      product_subcategory: item.product.subcategory,
      product_name: item.product.name,
      variant_name: item.selectedVariant.name,
      variant_price: item.selectedVariant.price,
      selected_flavors: item.selectedFlavors,
      selected_extras: item.selectedExtras,
      has_cream: item.hasCream,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.totalPrice,
      notes: item.notes ?? null,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

    if (itemsError) {
      console.error('Error inserting order items:', itemsError);
      // Order was created but items failed — log but don't fail the response
    }

    // Send notifications (Telegram + Email) — non-blocking, errors are logged not thrown
    sendOrderNotifications({
      orderNumber,
      checkoutData,
      items,
      total,
      deliveryFee,
    }).catch((err) => console.error('Notification error:', err));

    const order = mapOrderRow(orderData);
    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error creating order:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOrderRow(row: any) {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerSurname: row.customer_surname,
    customerPhone: row.customer_phone,
    customerAddress: row.customer_address,
    customerCity: row.customer_city,
    deliveryType: row.delivery_type,
    deliveryTime: row.delivery_time,
    paymentMethod: row.payment_method,
    notes: row.notes,
    status: row.status,
    subtotal: row.subtotal,
    deliveryFee: row.delivery_fee,
    total: row.total,
    whatsappConsent: row.whatsapp_consent,
    marketingConsent: row.marketing_consent,
    gdprConsent: row.gdpr_consent,
    createdAt: row.created_at,
  };
}
