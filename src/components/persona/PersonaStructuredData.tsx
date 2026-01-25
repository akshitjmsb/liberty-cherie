import { Persona, Product } from '@/types';

interface PersonaStructuredDataProps {
  persona: Persona;
  products: Product[];
  baseUrl?: string;
}

export default function PersonaStructuredData({
  persona,
  products,
  baseUrl = 'https://libertycherie.com',
}: PersonaStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: persona.seo_title || `Shop for ${persona.name} | Liberty Chérie Creation`,
    description: persona.seo_description || persona.description,
    url: `${baseUrl}/shop-for/${persona.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.images?.[0] ? `${baseUrl}${product.images[0]}` : undefined,
          url: `${baseUrl}/product/${product.slug}`,
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
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Shop For',
          item: `${baseUrl}/shop-for`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: persona.name,
          item: `${baseUrl}/shop-for/${persona.slug}`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
