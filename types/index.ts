// ─── Product Types ────────────────────────────────────────────────────────────

export type ProductCategory = 'gelateria' | 'graniteria';

export type GelateriaSubcategory =
  | 'cono'
  | 'coppetta'
  | 'vaschetta'
  | 'brioche'
  | 'frappe'
  | 'yogurt'
  | 'sfiziosita';

export type GraniteriaSubcategory =
  | 'granita'
  | 'granita_alcolica'
  | 'cremino_caffe'
  | 'brioche_vuota'
  | 'vaschetta_granita'
  | 'vaschetta_panna';

export type ProductSubcategory = GelateriaSubcategory | GraniteriaSubcategory;

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  maxFlavors: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  variants: ProductVariant[];
  emoji: string;
  allowCream: boolean;
  allowExtras: boolean;
  flavorType: 'gelato' | 'granita' | 'none';
  tags?: string[];
}

export interface Extra {
  id: string;
  name: string;
  price: number;
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedVariant: ProductVariant;
  selectedFlavors: string[];
  selectedExtras: Extra[];
  hasCream: boolean;
  quantity: number;
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

// ─── Order Types ──────────────────────────────────────────────────────────────

export type DeliveryType = 'pickup' | 'delivery';
export type PaymentMethod = 'cash' | 'card';
export type OrderStatus = 'pending' | 'confirmed' | 'ready' | 'delivered' | 'cancelled';

export interface CustomerData {
  name: string;
  surname: string;
  phone: string;
  address?: string;
  city?: string;
}

export interface DeliveryData {
  type: DeliveryType;
  time: 'asap' | string;
  scheduledTime?: string;
}

export interface PaymentData {
  method: PaymentMethod;
}

export interface ConsentData {
  gdprConsent: boolean;
  marketingConsent: boolean;
  whatsappConsent: boolean;
}

export interface CheckoutData {
  customer: CustomerData;
  delivery: DeliveryData;
  payment: PaymentData;
  consent: ConsentData;
  notes?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productCategory: string;
  productSubcategory: string;
  productName: string;
  variantName: string;
  variantPrice: number;
  selectedFlavors: string[];
  selectedExtras: Extra[];
  hasCream: boolean;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerSurname: string;
  customerPhone: string;
  customerAddress?: string;
  customerCity?: string;
  deliveryType: DeliveryType;
  deliveryTime: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  whatsappConsent: boolean;
  marketingConsent: boolean;
  gdprConsent: boolean;
  createdAt: string;
  items?: OrderItem[];
}

// ─── Admin Types ──────────────────────────────────────────────────────────────

export interface AdminStats {
  todayOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

// ─── UI Types ─────────────────────────────────────────────────────────────────

export type CheckoutStep = 'customer' | 'payment' | 'delivery' | 'summary';

export interface TimeSlot {
  value: string;
  label: string;
}
