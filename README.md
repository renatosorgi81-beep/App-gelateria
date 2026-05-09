# Gelateria Vernaci — App di Ordinazione Online

Web app mobile-first per la gestione ordini di Gelateria Vernaci.  
Clienti possono sfogliare il menu, personalizzare il prodotto, scegliere ritiro o consegna e inviare l'ordine. Il pannello admin permette di gestire gli ordini in tempo reale.

---

## Stack Tecnologico

| Layer | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguaggio | TypeScript |
| Stile | Tailwind CSS |
| Database | Supabase (PostgreSQL + Realtime) |
| State | Zustand (carrello persistente in localStorage) |
| Forms | React Hook Form + Zod |
| Hosting | Vercel |

---

## Prerequisiti

- Node.js 18+
- Account [Supabase](https://supabase.com) (gratuito)
- Account [Vercel](https://vercel.com) (gratuito)
- Git

---

## Setup Locale — Passo per Passo

### 1. Clona il repository

```bash
git clone https://github.com/renatosorgi81-beep/app-gelateria.git
cd app-gelateria
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Crea il progetto Supabase

1. Vai su [supabase.com](https://supabase.com) → "New project"
2. Scegli nome, password DB, regione (es. `West EU`)
3. Attendi il provisioning (~2 min)

### 4. Esegui lo schema SQL

1. Nella dashboard Supabase → **SQL Editor**
2. Apri il file `supabase/schema.sql` di questo repo
3. Incolla tutto e clicca **Run**
4. (Opzionale, solo per test) Ripeti con `supabase/seed.sql`

### 5. Copia le variabili d'ambiente

```bash
cp .env.example .env.local
```

Poi apri `.env.local` e compila:

| Variabile | Dove trovarla |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role key |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Scegli tu (es. `Admin@Vernaci2025`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numero WhatsApp business (es. `393291234567`) |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | Link Google Maps recensione (opzionale) |

> ⚠️ **Sicurezza**: Il `SUPABASE_SERVICE_ROLE_KEY` non deve mai essere esposto lato client. È usato solo nelle API route server-side.

### 6. Avvia in locale

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

---

## Deploy su Vercel

### Metodo 1 — Dashboard (consigliato)

1. Vai su [vercel.com](https://vercel.com) → "Add New Project"
2. Importa il repo GitHub
3. **Environment Variables**: copia tutte le variabili da `.env.local`
4. Clicca **Deploy**

### Metodo 2 — CLI

```bash
npm i -g vercel
vercel
# Segui le istruzioni
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Ripeti per ogni variabile
vercel --prod
```

---

## Variabili d'Ambiente — Riferimento Completo

```env
# Supabase (obbligatorio)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...  # solo server-side

# Admin Panel
NEXT_PUBLIC_ADMIN_PASSWORD=CambiaMiSubito!

# WhatsApp Business (es. +39 329 123 4567 → 393291234567)
NEXT_PUBLIC_WHATSAPP_NUMBER=393XXXXXXXXX

# Google Maps (opzionale)
NEXT_PUBLIC_GOOGLE_REVIEW_URL=https://g.page/r/...

# URL app (per link assoluti)
NEXT_PUBLIC_APP_URL=https://vernaci.vercel.app
```

---

## Pannello Admin

- URL: `https://tuo-dominio.vercel.app/admin`
- Login con la password impostata in `NEXT_PUBLIC_ADMIN_PASSWORD`
- Funzionalità:
  - Visualizza tutti gli ordini del giorno
  - Filtra per stato (In attesa / Confermati / Pronti / Consegnati)
  - Cambia stato ordine con un tap
  - Aggiornamenti in tempo reale via Supabase Realtime
  - Chiama il cliente direttamente dall'ordine

> ⚠️ **Sicurezza Admin**: Per il pannello MVP usiamo una semplice password in env var. Per la produzione si consiglia di implementare autenticazione Supabase Auth o un servizio terzo (es. Auth.js, Clerk).

---

## Supabase — Row Level Security (RLS)

Il file `schema.sql` configura già le policy RLS:

- **Clienti anonimi**: possono creare ordini e leggere i propri (per tracking)
- **Service role**: accesso completo (usato dalle API route admin)

Per la produzione, restringere la policy `SELECT` su `orders`:

```sql
-- Sostituisci la policy "Users can view own orders" con:
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO anon
  USING (customer_phone = current_setting('app.user_phone', true));
```

---

## Personalizzazione

### Colori e Tema
Modifica `tailwind.config.js` → sezione `colors`:
- `primary`: colore principale (verde bosco)
- `accent`: colore secondario (oro caldo)
- `background`: sfondo pagina

### Prodotti e Gusti
Tutto il catalogo è in `lib/constants.ts`:
- `PRODUCTS`: array prodotti con varianti
- `GELATO_FLAVORS`: gusti gelato disponibili
- `GRANITA_FLAVORS`: gusti granita
- `EXTRAS`: aggiunte (panna, colate, ecc.)
- `BUSINESS_CONFIG`: nome attività, orari, telefono, fee consegna

### Orari di Apertura
In `lib/constants.ts` → `BUSINESS_CONFIG.openHours`:
```ts
openHours: {
  days: [0,1,2,3,4,5,6], // 0=domenica
  openTime: '15:00',
  closeTime: '23:00',
},
```

### Fee Consegna e Ordine Minimo
```ts
deliveryFee: 3.5,        // €
minOrderDelivery: 10,    // €
```

---

## Struttura del Progetto

```
app/
  page.tsx              # Home
  menu/
    page.tsx            # Scelta categoria
    [category]/page.tsx # Lista prodotti
  product/[id]/page.tsx # Personalizzazione prodotto
  cart/page.tsx         # Carrello
  checkout/page.tsx     # Checkout 4 step
  checkout/success/     # Pagina conferma
  track/page.tsx        # Traccia ordine
  admin/page.tsx        # Pannello admin
  admin/login/page.tsx  # Login admin
  privacy/page.tsx      # Privacy policy
  api/
    orders/route.ts     # POST (crea ordine) / GET (traccia)
    admin/orders/route.ts # GET/PATCH (admin)

components/
  layout/               # Header, BottomNav
  home/                 # HeroSection, OpenStatus, QuickActions
  menu/                 # CategoryCard, ProductCard
  product/              # VariantSelector, FlavorSelector, ExtraSelector, CreamToggle
  cart/                 # CartItem, CartSummary
  checkout/             # StepIndicator, CustomerStep, DeliveryStep, PaymentStep, SummaryStep, ConsentSection
  admin/                # OrderCard, OrderTable, StatusBadge
  ui/                   # Button, Input, Card, Modal

lib/
  constants.ts          # Prodotti, gusti, configurazione
  utils.ts              # Helper functions
  store/
    cartStore.ts        # Zustand cart (persistente)
    orderStore.ts       # Zustand ordine corrente
  supabase/
    client.ts           # Browser client
    server.ts           # Server client
    types.ts            # Database types

supabase/
  schema.sql            # Struttura tabelle + RLS
  seed.sql              # Dati di test

types/
  index.ts              # TypeScript types
```

---

## Database Schema

```
orders
  id, order_number, customer_name, customer_surname
  customer_phone, customer_address, customer_city
  delivery_type (pickup|delivery), delivery_time
  payment_method (cash|card), notes
  status (pending→confirmed→ready→delivered|cancelled)
  subtotal, delivery_fee, total
  gdpr_consent, whatsapp_consent, marketing_consent
  created_at

order_items
  id, order_id (FK), product_category, product_subcategory
  product_name, variant_name, variant_price
  selected_flavors (JSONB), selected_extras (JSONB)
  has_cream, quantity, unit_price, total_price, notes
```

---

## Privacy & GDPR

L'app raccoglie i seguenti dati personali:
- Nome, cognome, telefono (necessari per l'ordine)
- Indirizzo (solo se si sceglie la consegna)

Consensi richiesti in fase di checkout:
- **Obbligatorio**: trattamento dati per gestione ordine (art. 6 GDPR)
- **Opzionale**: notifiche WhatsApp sull'ordine
- **Opzionale**: offerte e promozioni via WhatsApp/SMS

> **IMPORTANTE**: Prima del go-live, far redigere/revisionare la Privacy Policy (`app/privacy/page.tsx`) da un consulente legale specializzato in GDPR. La policy presente è solo un template indicativo.

---

## Roadmap Futura

- [ ] Pagamenti online (Stripe)
- [ ] Notifiche WhatsApp automatiche agli status change (Twilio/Meta API)
- [ ] Sistema raccolta punti fedeltà
- [ ] App mobile nativa (React Native / Expo)
- [ ] Dashboard analytics avanzata
- [ ] Gestione prenotazioni tavoli
- [ ] Menù stagionale dinamico via CMS (Sanity, Contentful)
- [ ] Multi-negozio (gestione più punti vendita)

---

## Supporto

Per problemi tecnici aprire una issue su GitHub o contattare il team di sviluppo.
