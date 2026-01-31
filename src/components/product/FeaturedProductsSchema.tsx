import { Product } from '@/types';

interface FeaturedProductsSchemaProps {
  products: Product[];
  baseUrl?: string;
}

export default function FeaturedProductsSchema({
  products,
  baseUrl = 'https://libertycherie.com',
}: FeaturedProductsSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Creations | Liberty Chérie Creation',
    description: 'Handcrafted bags & accessories by Liberty Chérie Creation, a Quebec-based artisan.',
    url: baseUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images?.[0] ? `${baseUrl}${product.images[0]}` : undefined,
        url: `${baseUrl}/product/${product.slug || product.id}`,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency || 'CAD',
          availability: product.in_stock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
