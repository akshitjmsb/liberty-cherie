import type { Metadata, Viewport } from 'next';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import { Toaster } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'Liberty Chérie Creation | Handcrafted Bags & Accessories',
    template: '%s | Liberty Chérie Creation',
  },
  description:
    'Discover beautifully handcrafted bags, pouches, and accessories made with premium Liberty fabrics in Saint-Sauveur, Quebec. Custom jacket transformations available.',
  keywords: [
    'handmade bags',
    'Liberty fabric',
    'artisan accessories',
    'custom jackets',
    'Saint-Sauveur',
    'Quebec',
    'floral pouches',
    'handcrafted',
  ],
  authors: [{ name: 'Liberty Chérie Creation' }],
  creator: 'Liberty Chérie Creation',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    alternateLocale: 'fr_CA',
    url: 'https://libertycherie.ca',
    siteName: 'Liberty Chérie Creation',
    title: 'Liberty Chérie Creation | Handcrafted Bags & Accessories',
    description:
      'Discover beautifully handcrafted bags, pouches, and accessories made with premium Liberty fabrics.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Liberty Chérie Creation - Handcrafted Floral Accessories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liberty Chérie Creation',
    description: 'Handcrafted bags & accessories made with love in Quebec',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#1A2744',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FAF6F1',
              border: '1px solid #E8A5A5',
              color: '#1A2744',
            },
          }}
        />
        {/* Aria-live region for screen reader announcements */}
        <div
          id="announcements"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        />
        <BottomNav />
      </body>
    </html>
  );
}
