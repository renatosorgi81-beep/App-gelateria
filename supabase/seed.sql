-- ─────────────────────────────────────────────────────────────────────────────
-- Gelateria Vernaci — Seed Data
-- Optional: inserts sample orders for testing the admin panel.
-- Run AFTER schema.sql.
-- ─────────────────────────────────────────────────────────────────────────────

-- Sample order 1 — pending
INSERT INTO orders (
  order_number, customer_name, customer_surname, customer_phone,
  customer_address, customer_city, delivery_type, delivery_time,
  payment_method, status, subtotal, delivery_fee, total,
  gdpr_consent, whatsapp_consent, marketing_consent,
  created_at
) VALUES (
  'VRN-20240101-0001', 'Mario', 'Rossi', '+39 333 1234567',
  'Via Roma 10', 'Palermo', 'delivery', 'asap',
  'cash', 'pending', 7.50, 3.50, 11.00,
  true, false, false,
  now() - interval '5 minutes'
);

INSERT INTO order_items (
  order_id, product_category, product_subcategory, product_name,
  variant_name, variant_price, selected_flavors, selected_extras,
  has_cream, quantity, unit_price, total_price
) VALUES (
  (SELECT id FROM orders WHERE order_number = 'VRN-20240101-0001'),
  'gelateria', 'coppetta', 'Coppetta',
  'Grande', 3.50,
  '["Pistacchio", "Nocciola", "Cioccolato"]',
  '[{"id": "panna", "name": "Panna", "price": 0.30}]',
  false, 2, 3.80, 7.60
);

-- Sample order 2 — confirmed
INSERT INTO orders (
  order_number, customer_name, customer_surname, customer_phone,
  delivery_type, delivery_time, payment_method, status,
  subtotal, delivery_fee, total, gdpr_consent,
  created_at
) VALUES (
  'VRN-20240101-0002', 'Lucia', 'Bianchi', '+39 347 9876543',
  'pickup', '18:30', 'card', 'confirmed',
  5.00, 0, 5.00, true,
  now() - interval '20 minutes'
);

INSERT INTO order_items (
  order_id, product_category, product_subcategory, product_name,
  variant_name, variant_price, selected_flavors, selected_extras,
  has_cream, quantity, unit_price, total_price
) VALUES (
  (SELECT id FROM orders WHERE order_number = 'VRN-20240101-0002'),
  'graniteria', 'granita', 'Granita',
  'Grande', 3.00,
  '["Mandorla"]', '[]',
  true, 1, 3.00, 3.00
),
(
  (SELECT id FROM orders WHERE order_number = 'VRN-20240101-0002'),
  'graniteria', 'cremino_caffe', 'Cremino Caffè',
  'Medio', 2.50,
  '[]', '[]',
  true, 1, 2.50, 2.50
);

-- Sample order 3 — delivered
INSERT INTO orders (
  order_number, customer_name, customer_surname, customer_phone,
  delivery_type, delivery_time, payment_method, status,
  subtotal, delivery_fee, total, gdpr_consent,
  created_at
) VALUES (
  'VRN-20240101-0003', 'Giovanni', 'Ferri', '+39 320 5554433',
  'pickup', 'asap', 'cash', 'delivered',
  8.30, 0, 8.30, true,
  now() - interval '2 hours'
);

INSERT INTO order_items (
  order_id, product_category, product_subcategory, product_name,
  variant_name, variant_price, selected_flavors, selected_extras,
  has_cream, quantity, unit_price, total_price
) VALUES (
  (SELECT id FROM orders WHERE order_number = 'VRN-20240101-0003'),
  'gelateria', 'brioche', 'Brioche con Gelato',
  'Classica', 3.30,
  '["Fragola", "Limone", "Fior di latte"]',
  '[{"id": "colata-pistacchio", "name": "Colata Pistacchio", "price": 0}]',
  false, 2, 3.30, 6.60
),
(
  (SELECT id FROM orders WHERE order_number = 'VRN-20240101-0003'),
  'gelateria', 'cono', 'Cono Piccolo',
  'Piccolo', 2.00,
  '["Caramello al burro salato"]', '[]',
  false, 1, 2.00, 2.00
);
