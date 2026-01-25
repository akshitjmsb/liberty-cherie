import { Product } from '@/types';

interface ProductSchemaProps {
  product: Product;
  url: string;
}

export default function ProductSchema({ product, url }: ProductSchemaProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://libertycherie.ca';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.map((img) =>
      img.startsWith('http') ? img : `${BASE_URL}${img}`
    ) || [],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Liberty Chérie Creation',
    },
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: product.currency || 'CAD',
      price: product.price,
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Liberty Chérie Creation',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'CA',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'DAY',
          },
        },
      },
    },
    category: product.category,
    keywords: product.tags?.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
