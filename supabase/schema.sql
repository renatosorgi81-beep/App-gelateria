-- ─────────────────────────────────────────────────────────────────────────────
-- Gelateria Vernaci — Supabase Schema
-- Run this in the Supabase SQL Editor before first use.
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Orders ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS orders (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number     text UNIQUE NOT NULL,
  customer_name    text NOT NULL,
  customer_surname text NOT NULL,
  customer_phone   text NOT NULL,
  customer_address text,
  customer_city    text,
  delivery_type    text NOT NULL CHECK (delivery_type IN ('pickup', 'delivery')),
  delivery_time    text NOT NULL,
  payment_method   text NOT NULL CHECK (payment_method IN ('cash', 'card')),
  notes            text,
  status           text NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending', 'confirmed', 'ready', 'delivered', 'cancelled')),
  subtotal         numeric(10,2) NOT NULL,
  delivery_fee     numeric(10,2) NOT NULL DEFAULT 0,
  total            numeric(10,2) NOT NULL,
  whatsapp_consent  boolean NOT NULL DEFAULT false,
  marketing_consent boolean NOT NULL DEFAULT false,
  gdpr_consent      boolean NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- ─── Order Items ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS order_items (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id            uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_category    text NOT NULL,
  product_subcategory text NOT NULL,
  product_name        text NOT NULL,
  variant_name        text NOT NULL,
  variant_price       numeric(10,2) NOT NULL,
  selected_flavors    jsonb NOT NULL DEFAULT '[]',
  selected_extras     jsonb NOT NULL DEFAULT '[]',
  has_cream           boolean NOT NULL DEFAULT false,
  quantity            integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price          numeric(10,2) NOT NULL,
  total_price         numeric(10,2) NOT NULL,
  notes               text
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_orders_status      ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at  ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_phone       ON orders (customer_phone);
CREATE INDEX IF NOT EXISTS idx_order_items_order  ON order_items (order_id);

-- ─── Row Level Security ───────────────────────────────────────────────────────

ALTER TABLE orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert orders (for checkout)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to read their own order by phone + order_number (for tracking)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO anon
  USING (true);  -- simplified for MVP; tighten per production needs

-- Allow anonymous users to insert order items
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reading order items
CREATE POLICY "Users can view order items"
  ON order_items FOR SELECT
  TO anon
  USING (true);

-- Service role can do everything (used from API routes)
CREATE POLICY "Service role full access orders"
  ON orders FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access order_items"
  ON order_items FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ─── Realtime ─────────────────────────────────────────────────────────────────

-- Enable realtime for admin panel
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE order_items;

-- ─── Helper function: generate order number ───────────────────────────────────

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  date_part text;
  rand_part text;
  new_number text;
  counter integer := 0;
BEGIN
  date_part := to_char(now(), 'YYYYMMDD');
  LOOP
    rand_part := lpad(floor(random() * 9000 + 1000)::text, 4, '0');
    new_number := 'VRN-' || date_part || '-' || rand_part;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM orders WHERE order_number = new_number);
    counter := counter + 1;
    IF counter > 100 THEN
      RAISE EXCEPTION 'Could not generate unique order number';
    END IF;
  END LOOP;
  RETURN new_number;
END;
$$;
