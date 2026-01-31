import { Metadata } from 'next';
import { getActivePersonas } from '@/lib/personas';
import ShopForContent from './ShopForContent';

export const metadata: Metadata = {
  title: 'Shop For | Liberty Chérie Creation',
  description:
    'Find the perfect handcrafted accessories for your lifestyle. Shop our curated collections designed for city commuters, busy moms, gift-givers, travelers, and more.',
  openGraph: {
    title: 'Shop For | Liberty Chérie Creation',
    description:
      'Find the perfect handcrafted accessories for your lifestyle. Shop our curated collections designed for city commuters, busy moms, gift-givers, travelers, and more.',
  },
};

export const revalidate = 300; // Revalidate every 5 minutes

export default async function ShopForPage() {
  const personas = await getActivePersonas();

  return <ShopForContent personas={personas} />;
}
