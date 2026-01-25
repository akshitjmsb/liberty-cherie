# Liberty Chérie Creation

Handcrafted bags & accessories e-commerce site for a Quebec-based artisan business. PWA-enabled, mobile-first design.

## Tech Stack

- **Next.js 16** with App Router (Turbopack dev)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Zustand** (state management with persistence)
- **Supabase** (database & auth)
- **Stripe** (payments & webhooks)
- **PWA** with service worker

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
npm start        # Start production server
```

## Project Structure

```
src/
├── app/           # Next.js App Router pages & API routes
├── components/    # React components
│   ├── layout/    # Header, Footer, BottomNav
│   ├── ui/        # AnimatedSection, TrustBadges, SwipeableDrawer
│   ├── cart/      # CartDrawer
│   ├── product/   # ProductCard, ProductGrid, Testimonials
│   ├── persona/   # Buyer persona components
│   └── newsletter/
├── lib/           # Utilities (supabase, stripe, products, personas)
├── store/         # Zustand stores (cart.ts)
├── types/         # TypeScript types
└── hooks/         # Custom React hooks
```

## Key Patterns

### Brand Colors
Defined in `src/app/globals.css` as CSS variables:
- `--color-primary`: Dusty Rose Pink (#D4858A)
- `--color-secondary`: Sage (#A8B8B0)
- `--color-accent`: Olive Green (#6B7355)
- `--color-navy`: Deep Navy (#2B3A4D)
- `--color-cream`: Warm Cream (#F5E6D3)

Use via Tailwind: `bg-primary`, `text-navy`, etc.

### Cart State
Zustand store at `src/store/cart.ts` with localStorage persistence.

### Mobile-First
- Bottom navigation for mobile (`BottomNav.tsx`)
- Safe area insets for notched devices
- Swipeable drawer for cart

### Fonts
- Display: Playfair Display (serif)
- Body: Inter (sans-serif)

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:
- Supabase: URL, anon key, service role key
- Stripe: publishable key, secret key, webhook secret
- App URL and admin email

## API Routes

- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Handle Stripe webhooks
- `POST /api/contact` - Contact form submission
- `POST /api/custom-order` - Custom order requests
- `POST /api/newsletter/subscribe` - Newsletter signup
