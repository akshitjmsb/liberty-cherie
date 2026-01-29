import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Truck, Shield, RefreshCw } from 'lucide-react';
import { getProductBySlug } from '@/lib/products';
import AddToCartButton from './AddToCartButton';
import ProductSchema from '@/components/product/ProductSchema';
import ReviewSection from '@/components/product/ReviewSection';

interface Props {
  params: Promise<{ slug: string }>;
}

// Mock product for development
const mockProduct = {
  id: '1',
  name: 'Floral Daisy Pouch',
  name_fr: 'Pochette Marguerite Florale',
  slug: 'floral-daisy-pouch',
  description: 'A beautiful handcrafted pouch featuring our signature daisy floral pattern. Perfect for storing makeup, toiletries, or small accessories. Made with premium Liberty fabric and lined with soft cotton. Features a secure zipper closure and measures approximately 20cm x 15cm.',
  description_fr: 'Une belle pochette artisanale avec notre motif floral marguerite signature.',
  price: 45.00,
  currency: 'CAD',
  images: ['/images/products/placeholder-1.jpg', '/images/products/placeholder-2.jpg'],
  category: 'pouches' as const,
  tags: ['floral', 'daisy', 'liberty-fabric', 'handmade'],
  in_stock: true,
  stock_quantity: 10,
  featured: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug) || mockProduct;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  let product = await getProductBySlug(slug);

  // Use mock if product not found in DB
  if (!product) {
    if (slug === 'floral-daisy-pouch' || slug === mockProduct.slug) {
      product = mockProduct;
    } else {
      notFound();
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: product?.currency || 'CAD',
    }).format(price);
  };

  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://libertycherie.ca';
  const productUrl = `${BASE_URL}/product/${product.slug}`;

  return (
    <div className="animate-fade-in">
      <ProductSchema product={product} url={productUrl} />
      <div className="container py-8">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-soft-gray hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-cream">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-soft-gray">
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-primary transition-colors cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - View ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <span className="category-tag">{product.category}</span>

            {/* Name */}
            <h1 className="font-display text-3xl lg:text-4xl text-navy mt-4">
              {product.name}
            </h1>

            {/* French Name */}
            {product.name_fr && (
              <p className="text-soft-gray italic mt-1">{product.name_fr}</p>
            )}

            {/* Price */}
            <p className="price text-2xl mt-4">{formatPrice(product.price)}</p>

            {/* Stock Status */}
            <div className="mt-4">
              {product.in_stock ? (
                <span className="inline-flex items-center gap-2 text-secondary font-medium">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-[var(--error)] font-medium">
                  <span className="w-2 h-2 bg-[var(--error)] rounded-full" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="font-medium text-navy mb-2">Description</h2>
              <p className="text-soft-gray leading-relaxed">{product.description}</p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-6">
                <h2 className="font-medium text-navy mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cream text-soft-gray text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-sm text-soft-gray">
                <Truck className="w-5 h-5 text-primary" />
                <span>Free shipping over $100</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-soft-gray">
                <Shield className="w-5 h-5 text-primary" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-soft-gray">
                <RefreshCw className="w-5 h-5 text-primary" />
                <span>Easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection productId={product.id} productName={product.name} />
      </div>
    </div>
  );
}
