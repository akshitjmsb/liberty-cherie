import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
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
  themeColor: '#c26e7a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
