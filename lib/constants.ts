import type { Product, Extra, TimeSlot } from '@/types';

// ─── Business Configuration ───────────────────────────────────────────────────

export const BUSINESS_CONFIG = {
  name: 'Gelateria Vernaci',
  tagline: 'Il gusto autentico della Sicilia',
  address: 'Via Roma 1, Palermo',
  phone: '+39 091 000 0000',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393XXXXXXXXX',
  openHours: {
    // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    days: [0, 1, 2, 3, 4, 5, 6], // all days
    openTime: '15:00',
    closeTime: '23:00',
  },
  deliveryFee: 3.5,
  minOrderDelivery: 10,
  googleReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || '#',
} as const;

// ─── Flavors ──────────────────────────────────────────────────────────────────

export const GELATO_FLAVORS: string[] = [
  'Quella',
  "Quell'altra",
  'Cioccolato',
  'Nocciola',
  'Pistacchio',
  'Fragola',
  'Limone',
  'Amarena',
  'Franui',
  'Stracciatella',
  'Zuppa inglese',
  'Fior di latte',
  'Rosita',
  'Cookies',
  'Caffè',
  'Nocciotella',
  'Fondente',
  'Bacio',
  'Caramello al burro salato',
  'Alma',
  'Mango',
  'Banana',
];

export const GRANITA_FLAVORS: string[] = [
  'Limone',
  'Mandorla',
  'Fragola',
  'Caffè',
  'Menta',
  'Cioccolato',
  'Arancia',
  'Gelso',
  'Pesca',
  'Anguria',
  'Cocco',
];

// ─── Extras ───────────────────────────────────────────────────────────────────

export const EXTRAS: Extra[] = [
  { id: 'panna', name: 'Panna', price: 0.3 },
  { id: 'colata-nutella', name: 'Colata Nutella', price: 0 },
  { id: 'colata-bianca', name: 'Colata Bianca', price: 0 },
  { id: 'colata-pistacchio', name: 'Colata Pistacchio', price: 0 },
  { id: 'colata-caramello', name: 'Colata Caramello', price: 0 },
  { id: 'granella-arachidi', name: 'Granella Arachidi', price: 0 },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  // ── GELATERIA: Cono ──────────────────────────────────────────────────────────
  {
    id: 'cono-piccolo',
    name: 'Cono Piccolo',
    description: 'Il classico cono in cialda croccante con il tuo gelato preferito.',
    category: 'gelateria',
    subcategory: 'cono',
    emoji: '🍦',
    allowCream: true,
    allowExtras: true,
    flavorType: 'gelato',
    variants: [
      { id: 'piccolo', name: 'Piccolo', price: 2.0, maxFlavors: 3 },
      { id: 'classico', name: 'Classico', price: 2.5, maxFlavors: 3 },
      { id: 'croccante', name: 'Croccante', price: 2.8, maxFlavors: 3 },
      { id: 'speciale-pralinato', name: 'Speciale Pralinato', price: 4.0, maxFlavors: 3 },
    ],
    tags: ['popolare'],
  },
  // ── GELATERIA: Coppetta ───────────────────────────────────────────────────────
  {
    id: 'coppetta',
    name: 'Coppetta',
    description: 'Gelato artigianale servito nella nostra coppetta biodegradabile.',
    category: 'gelateria',
    subcategory: 'coppetta',
    emoji: '🍨',
    allowCream: true,
    allowExtras: true,
    flavorType: 'gelato',
    variants: [
      { id: 'piccola', name: 'Piccola', price: 2.0, maxFlavors: 3 },
      { id: 'media', name: 'Media', price: 2.5, maxFlavors: 3 },
      { id: 'medio-grande', name: 'Medio-Grande', price: 3.0, maxFlavors: 3 },
      { id: 'grande', name: 'Grande', price: 3.5, maxFlavors: 3 },
      { id: 'coppa-gioia', name: 'Coppa Gioia', price: 5.0, maxFlavors: 3 },
    ],
    tags: ['popolare'],
  },
  // ── GELATERIA: Vaschetta ──────────────────────────────────────────────────────
  {
    id: 'vaschetta-gelato',
    name: 'Vaschetta Gelato',
    description: 'Gelato da asporto nella nostra vaschetta. Perfetto per una serata in famiglia.',
    category: 'gelateria',
    subcategory: 'vaschetta',
    emoji: '🫙',
    allowCream: false,
    allowExtras: false,
    flavorType: 'gelato',
    variants: [
      { id: 'medio', name: 'Medio (500ml)', price: 8.0, maxFlavors: 3 },
      { id: 'grande', name: 'Grande (1L)', price: 14.0, maxFlavors: 4 },
      { id: 'famiglia', name: 'Famiglia (2L)', price: 26.0, maxFlavors: 5 },
    ],
  },
  // ── GELATERIA: Brioche ────────────────────────────────────────────────────────
  {
    id: 'brioche',
    name: 'Brioche con Gelato',
    description: "La nostra soffice brioche artigianale farcita di gelato. Un'icona siciliana.",
    category: 'gelateria',
    subcategory: 'brioche',
    emoji: '🥐',
    allowCream: true,
    allowExtras: true,
    flavorType: 'gelato',
    variants: [
      { id: 'classica', name: 'Classica', price: 3.3, maxFlavors: 3 },
      { id: 'aromatizzata', name: "Aromatizzata all'Arancia", price: 3.5, maxFlavors: 3 },
    ],
    tags: ['specialita'],
  },
  // ── GELATERIA: Frappè ─────────────────────────────────────────────────────────
  {
    id: 'frappe',
    name: 'Frappè',
    description: 'Cremoso frappè di gelato, fresco e dissetante.',
    category: 'gelateria',
    subcategory: 'frappe',
    emoji: '🥤',
    allowCream: true,
    allowExtras: false,
    flavorType: 'gelato',
    variants: [
      { id: 'piccolo', name: 'Piccolo', price: 3.0, maxFlavors: 2 },
      { id: 'medio', name: 'Medio', price: 3.5, maxFlavors: 2 },
      { id: 'grande', name: 'Grande', price: 4.0, maxFlavors: 3 },
    ],
  },
  // ── GELATERIA: Yogurt ─────────────────────────────────────────────────────────
  {
    id: 'yogurt',
    name: 'Yogurt',
    description: 'Fresco yogurt gelato con la tua scelta di gusti.',
    category: 'gelateria',
    subcategory: 'yogurt',
    emoji: '🍶',
    allowCream: false,
    allowExtras: true,
    flavorType: 'gelato',
    variants: [
      { id: 'piccolo', name: 'Piccolo', price: 2.5, maxFlavors: 2 },
      { id: 'medio', name: 'Medio', price: 3.0, maxFlavors: 2 },
      { id: 'grande', name: 'Grande', price: 3.5, maxFlavors: 3 },
    ],
  },
  // ── GELATERIA: Sfiziosità ─────────────────────────────────────────────────────
  {
    id: 'sfiziosita',
    name: 'Sfiziosità',
    description: 'Le nostre creazioni speciali: semifreddi, torte gelato e dessert del momento.',
    category: 'gelateria',
    subcategory: 'sfiziosita',
    emoji: '🎂',
    allowCream: true,
    allowExtras: true,
    flavorType: 'gelato',
    variants: [
      { id: 'singolo', name: 'Porzione singola', price: 4.5, maxFlavors: 2 },
      { id: 'doppio', name: 'Porzione doppia', price: 7.0, maxFlavors: 3 },
    ],
    tags: ['specialita'],
  },
  // ── GRANITERIA: Granita ───────────────────────────────────────────────────────
  {
    id: 'granita',
    name: 'Granita',
    description:
      'La vera granita siciliana, preparata ogni giorno con ingredienti freschi e selezionati.',
    category: 'graniteria',
    subcategory: 'granita',
    emoji: '🧊',
    allowCream: true,
    allowExtras: false,
    flavorType: 'granita',
    variants: [
      { id: 'piccola', name: 'Piccola', price: 2.0, maxFlavors: 1 },
      { id: 'media', name: 'Media', price: 2.5, maxFlavors: 1 },
      { id: 'grande', name: 'Grande', price: 3.0, maxFlavors: 1 },
    ],
    tags: ['popolare', 'estivo'],
  },
  // ── GRANITERIA: Granita Alcolica ──────────────────────────────────────────────
  {
    id: 'granita-alcolica',
    name: 'Granita Alcolica',
    description:
      'La nostra granita speciale con un tocco di spirito. Solo per adulti. 🔞',
    category: 'graniteria',
    subcategory: 'granita_alcolica',
    emoji: '🍹',
    allowCream: false,
    allowExtras: false,
    flavorType: 'granita',
    variants: [
      { id: 'media', name: 'Media', price: 4.0, maxFlavors: 1 },
      { id: 'grande', name: 'Grande', price: 5.0, maxFlavors: 1 },
    ],
    tags: ['adulti'],
  },
  // ── GRANITERIA: Cremino Caffè ─────────────────────────────────────────────────
  {
    id: 'cremino-caffe',
    name: 'Cremino Caffè',
    description: "Granita di caffè con crema di latte montata. Un'esperienza siciliana unica.",
    category: 'graniteria',
    subcategory: 'cremino_caffe',
    emoji: '☕',
    allowCream: true,
    allowExtras: false,
    flavorType: 'none',
    variants: [
      { id: 'medio', name: 'Medio', price: 2.5, maxFlavors: 0 },
      { id: 'grande', name: 'Grande', price: 3.0, maxFlavors: 0 },
    ],
    tags: ['specialita'],
  },
  // ── GRANITERIA: Brioche Vuota ─────────────────────────────────────────────────
  {
    id: 'brioche-vuota',
    name: 'Brioche Vuota',
    description: 'La nostra soffice brioche da accompagnare alla granita.',
    category: 'graniteria',
    subcategory: 'brioche_vuota',
    emoji: '🥐',
    allowCream: false,
    allowExtras: false,
    flavorType: 'none',
    variants: [{ id: 'classica', name: 'Classica', price: 1.0, maxFlavors: 0 }],
  },
  // ── GRANITERIA: Vaschetta Granita ─────────────────────────────────────────────
  {
    id: 'vaschetta-granita',
    name: 'Vaschetta Granita',
    description: 'Granita da asporto per tutta la famiglia.',
    category: 'graniteria',
    subcategory: 'vaschetta_granita',
    emoji: '🫙',
    allowCream: false,
    allowExtras: false,
    flavorType: 'granita',
    variants: [
      { id: 'medio', name: 'Medio (500ml)', price: 7.0, maxFlavors: 2 },
      { id: 'grande', name: 'Grande (1L)', price: 12.0, maxFlavors: 3 },
    ],
  },
  // ── GRANITERIA: Vaschetta Panna ───────────────────────────────────────────────
  {
    id: 'vaschetta-panna',
    name: 'Vaschetta Panna',
    description: 'Crema di latte montata a mano, da aggiungere alla tua granita.',
    category: 'graniteria',
    subcategory: 'vaschetta_panna',
    emoji: '🍦',
    allowCream: false,
    allowExtras: false,
    flavorType: 'none',
    variants: [
      { id: 'piccola', name: 'Piccola (250ml)', price: 3.0, maxFlavors: 0 },
      { id: 'grande', name: 'Grande (500ml)', price: 5.0, maxFlavors: 0 },
    ],
  },
];

// ─── Category Config ──────────────────────────────────────────────────────────

export const CATEGORY_CONFIG = {
  gelateria: {
    label: 'Gelateria',
    description: 'Gelato artigianale, coni, coppette e molto altro',
    emoji: '🍦',
    color: 'primary',
  },
  graniteria: {
    label: 'Graniteria',
    description: 'Granite siciliane fresche, brioche e cremini',
    emoji: '🧊',
    color: 'accent',
  },
} as const;

export const SUBCATEGORY_LABELS: Record<string, string> = {
  cono: 'Cono',
  coppetta: 'Coppetta',
  vaschetta: 'Vaschetta',
  brioche: 'Brioche con Gelato',
  frappe: 'Frappè',
  yogurt: 'Yogurt',
  sfiziosita: 'Sfiziosità',
  granita: 'Granita',
  granita_alcolica: 'Granita Alcolica',
  cremino_caffe: 'Cremino Caffè',
  brioche_vuota: 'Brioche Vuota',
  vaschetta_granita: 'Vaschetta Granita',
  vaschetta_panna: 'Vaschetta Panna',
};

// ─── Time Slots ───────────────────────────────────────────────────────────────

export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const now = new Date();
  const startHour = 15;
  const endHour = 22; // last slot at 22:30

  for (let h = startHour; h <= endHour; h++) {
    for (const m of [0, 30]) {
      const slotDate = new Date();
      slotDate.setHours(h, m, 0, 0);
      // Only include future slots (at least 30 min from now)
      const minTime = new Date(now.getTime() + 30 * 60 * 1000);
      if (slotDate > minTime) {
        const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        slots.push({ value: timeStr, label: timeStr });
      }
    }
  }
  return slots;
}

// ─── Order Number ─────────────────────────────────────────────────────────────

export function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `VRN-${date}-${rand}`;
}
