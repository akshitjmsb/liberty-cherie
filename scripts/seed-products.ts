/**
 * Seed Products Script
 *
 * Run this script to add sample products to your database.
 * Usage: npx ts-node --esm scripts/seed-products.ts
 *
 * Make sure you have your .env.local file configured with:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sampleProducts = [
  {
    name: 'Floral Daisy Pouch',
    name_fr: 'Pochette Marguerite Florale',
    slug: 'floral-daisy-pouch',
    description: 'A beautiful handcrafted pouch featuring our signature daisy floral pattern. Perfect for storing makeup, toiletries, or small accessories. Made with premium Liberty fabric and lined with soft cotton.',
    description_fr: 'Une belle pochette artisanale avec notre motif floral marguerite signature. Parfaite pour ranger le maquillage, les articles de toilette ou les petits accessoires.',
    price: 45.00,
    currency: 'CAD',
    category: 'pouches',
    tags: ['floral', 'daisy', 'liberty-fabric', 'handmade'],
    images: ['/images/products/daisy-pouch-1.jpg', '/images/products/daisy-pouch-2.jpg'],
    in_stock: true,
    stock_quantity: 10,
    featured: true,
  },
  {
    name: 'Victoria Rose Tote Bag',
    name_fr: 'Sac Fourre-tout Rose Victoria',
    slug: 'victoria-rose-tote-bag',
    description: 'An elegant tote bag featuring the Victoria rose pattern. Spacious enough for daily essentials with a secure interior pocket. Handmade in Saint-Sauveur.',
    description_fr: 'Un élégant sac fourre-tout avec le motif rose Victoria. Assez spacieux pour les essentiels quotidiens.',
    price: 85.00,
    currency: 'CAD',
    category: 'bags',
    tags: ['rose', 'victoria', 'tote', 'handmade'],
    images: ['/images/products/victoria-tote-1.jpg', '/images/products/victoria-tote-2.jpg'],
    in_stock: true,
    stock_quantity: 5,
    featured: true,
  },
  {
    name: 'Frida Kahlo Collection Clutch',
    name_fr: 'Pochette Collection Frida Kahlo',
    slug: 'frida-kahlo-clutch',
    description: 'Inspired by the vibrant artistry of Frida Kahlo, this clutch features bold floral patterns and rich colors. A statement piece for special occasions.',
    description_fr: 'Inspirée par l\'art vibrant de Frida Kahlo, cette pochette présente des motifs floraux audacieux.',
    price: 65.00,
    currency: 'CAD',
    category: 'accessories',
    tags: ['frida-kahlo', 'clutch', 'special-occasion', 'colorful'],
    images: ['/images/products/frida-clutch-1.jpg'],
    in_stock: true,
    stock_quantity: 8,
    featured: true,
  },
  {
    name: 'Custom Jacket Transformation',
    name_fr: 'Transformation de Veste Personnalisée',
    slug: 'custom-jacket-transformation',
    description: 'Transform your denim or leather jacket with our custom floral appliqué service. Send us your jacket and we\'ll add beautiful Liberty fabric accents.',
    description_fr: 'Transformez votre veste en jean ou en cuir avec notre service d\'appliqué floral personnalisé.',
    price: 150.00,
    currency: 'CAD',
    category: 'custom-jackets',
    tags: ['custom', 'jacket', 'transformation', 'personalized'],
    images: ['/images/products/custom-jacket-1.jpg'],
    in_stock: true,
    stock_quantity: 99,
    featured: false,
  },
  {
    name: 'Lone Flower Hair Scrunchie Set',
    name_fr: 'Ensemble de Chouchous Fleur Solitaire',
    slug: 'lone-flower-scrunchie-set',
    description: 'Set of 3 handmade scrunchies featuring our Lone Flower pattern. Gentle on hair while adding a touch of elegance.',
    description_fr: 'Ensemble de 3 chouchous faits main avec notre motif Fleur Solitaire.',
    price: 28.00,
    currency: 'CAD',
    category: 'accessories',
    tags: ['scrunchie', 'hair-accessory', 'set'],
    images: ['/images/products/scrunchie-set-1.jpg'],
    in_stock: true,
    stock_quantity: 20,
    featured: false,
  },
  {
    name: 'Garden Party Crossbody Bag',
    name_fr: 'Sac Bandoulière Garden Party',
    slug: 'garden-party-crossbody',
    description: 'A versatile crossbody bag perfect for day-to-night wear. Features adjustable strap and secure magnetic closure.',
    description_fr: 'Un sac bandoulière polyvalent parfait pour le jour et la nuit.',
    price: 95.00,
    currency: 'CAD',
    category: 'bags',
    tags: ['crossbody', 'garden', 'versatile'],
    images: ['/images/products/crossbody-1.jpg'],
    in_stock: true,
    stock_quantity: 6,
    featured: false,
  },
];

async function seedProducts() {
  console.log('🌸 Seeding products...\n');

  for (const product of sampleProducts) {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'slug' })
        .select()
        .single();

      if (error) {
        console.error(`❌ Failed to add "${product.name}":`, error.message);
      } else {
        console.log(`✅ Added: ${data.name}`);
      }
    } catch (err) {
      console.error(`❌ Error adding "${product.name}":`, err);
    }
  }

  console.log('\n🎉 Seeding complete!');
}

seedProducts().catch(console.error);
