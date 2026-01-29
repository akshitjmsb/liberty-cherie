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
│   ├── layout/    # Header, Footer, BottomNav, PageHero
│   ├── ui/        # Button, Badge, Alert, Input, AnimatedSection, TrustBadges
│   ├── cart/      # CartDrawer, CartItem, CartSummary
│   ├── checkout/  # CheckoutSteps
│   ├── product/   # ProductCard, ProductGrid, WishlistButton, Testimonials
│   ├── persona/   # Buyer persona components
│   ├── search/    # SearchBar
│   └── newsletter/
├── styles/        # Modular CSS (single source of truth from branding kit)
│   ├── _tokens.css         # Design tokens: colors, spacing, radius, shadows, florals
│   ├── _typography.css     # Font imports, heading styles, price display
│   ├── _buttons.css        # .btn base + 5 variants + sizes
│   ├── _forms.css          # .form-input, .form-select, .form-textarea, errors
│   ├── _cards.css          # .card base (white, 16px radius, hover lift)
│   ├── _product-cards.css  # .product-card, 3:4 aspect, badges, quick-add, color dots
│   ├── _navigation.css     # .nav-link animated underline, .cart-badge, .bottom-nav
│   ├── _badges-alerts.css  # .badge + .alert variants
│   ├── _cart.css           # .cart-item, .quantity-selector, .cart-summary
│   ├── _checkout.css       # .checkout-steps, .step-number states
│   ├── _page-hero.css      # .page-hero, .page-title, .breadcrumbs
│   ├── _footer.css         # .footer layout (4-col grid), footer florals
│   ├── _dividers.css       # .divider + .divider-floral
│   ├── _animations.css     # @keyframes, .animate-* utilities, stagger
│   ├── _layout.css         # .container, .overlay, .skeleton, scrollbar
│   └── _accessibility.css  # Focus indicators, .sr-only, reduced-motion
├── lib/           # Utilities (supabase, stripe, products, personas)
├── store/         # Zustand stores (cart.ts, wishlist.ts)
├── types/         # TypeScript types
└── hooks/         # Custom React hooks
```

## Design System

**The branding kit (`BRANDING_KIT.html`) is the single source of truth for all design decisions.** All CSS is modularized in `src/styles/` and imported via `src/app/globals.css`.

### Brand Colors
Defined in `src/styles/_tokens.css` as CSS variables:
- `--color-primary`: Rose Pink (#D4728C)
- `--color-secondary`: Sage Blue (#8FA5A4)
- `--color-accent`: Olive Green (#5A6B4A)
- `--color-navy`: Deep Navy (#1A2744)
- `--color-cream`: Warm Cream (#F5E6D3)
- `--color-primary-dark`: Dusty Rose (#B36B7A)

Use via Tailwind: `bg-primary`, `text-navy`, etc.

### Floral Assets
Self-hosted in `public/images/florals/` (7 PNG files). Referenced via CSS variables (`--floral-roses`, etc.) in `_tokens.css`. No external CDN dependencies.

### Component CSS Classes
Components use CSS classes from the stylesheet modules instead of inline Tailwind for kit-specified styles:
- Buttons: `.btn .btn-{variant}` (not inline Tailwind color classes)
- Badges: `.badge .badge-{variant}`
- Forms: `.form-input`, `.form-label`, `.form-input-error`
- Cards: `.card`, `.product-card`
- Cart: `.cart-item`, `.quantity-selector`, `.cart-summary`

### Cart State
Zustand store at `src/store/cart.ts` with localStorage persistence.

### Mobile-First
- Bottom navigation for mobile (`BottomNav.tsx`)
- Safe area insets for notched devices
- Swipeable drawer for cart

### Fonts
- Display: Cormorant Garamond (serif)
- Body: Montserrat (sans-serif)

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
