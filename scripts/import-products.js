/**
 * Import Products Script
 *
 * This script imports the 13 Liberty Chérie products into Supabase.
 *
 * Usage:
 *   node scripts/import-products.js
 *
 * Make sure you have your .env.local file configured with:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials. Check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Product data from CSV with prices and category mappings
const products = [
  {
    name: 'Bandeau',
    name_fr: 'Bandeau',
    slug: 'bandeau',
    description: 'Elegant floral headband made with premium Liberty fabric. A timeless accessory that adds a touch of French charm to any hairstyle.',
    description_fr: 'Bandeau floral élégant fait avec du tissu Liberty premium. Un accessoire intemporel qui ajoute une touche de charme français à toute coiffure.',
    price: 28.00,
    currency: 'CAD',
    category: 'accessories',
    tags: ['headband', 'headwear', 'liberty-fabric', 'floral'],
    images: ['/images/products/bandeau.svg'],
    in_stock: true,
    stock_quantity: 15,
    featured: false,
  },
  {
    name: 'Chouchou',
    name_fr: 'Chouchou',
    slug: 'chouchou',
    description: 'Handmade scrunchie crafted from Liberty floral fabric. Gentle on hair while adding a touch of elegance to your style.',
    description_fr: 'Chouchou fait main en tissu Liberty floral. Doux pour les cheveux tout en ajoutant une touche d\'élégance à votre style.',
    price: 18.00,
    currency: 'CAD',
    category: 'accessories',
    tags: ['scrunchie', 'hair-accessory', 'liberty-fabric', 'floral'],
    images: ['/images/products/chouchou.svg'],
    in_stock: true,
    stock_quantity: 25,
    featured: true,
  },
  {
    name: 'Col Victoria',
    name_fr: 'Col Victoria',
    slug: 'col-victoria',
    description: 'Detachable collar featuring the Victoria pattern. Transform any outfit with this elegant accessory inspired by Victorian fashion.',
    description_fr: 'Col amovible avec le motif Victoria. Transformez n\'importe quelle tenue avec cet accessoire élégant inspiré de la mode victorienne.',
    price: 35.00,
    currency: 'CAD',
    category: 'accessories',
    tags: ['collar', 'detachable', 'victoria', 'liberty-fabric'],
    images: ['/images/products/col-victoria.svg'],
    in_stock: true,
    stock_quantity: 10,
    featured: false,
  },
  {
    name: 'Porte-clés',
    name_fr: 'Porte-clés',
    slug: 'porte-cles',
    description: 'Charming keychain featuring Liberty floral fabric. A small touch of elegance for your everyday essentials.',
    description_fr: 'Charmant porte-clés en tissu Liberty floral. Une petite touche d\'élégance pour vos essentiels quotidiens.',
    price: 15.00,
    currency: 'CAD',
    category: 'accessories',
    tags: ['keychain', 'liberty-fabric', 'gift', 'floral'],
    images: ['/images/products/porte-cles.svg'],
    in_stock: true,
    stock_quantity: 30,
    featured: false,
  },
  {
    name: 'Banane Marguerite',
    name_fr: 'Banane Marguerite',
    slug: 'banane-marguerite',
    description: 'Stylish belt bag featuring the Marguerite daisy pattern. Perfect for hands-free convenience while maintaining your chic style.',
    description_fr: 'Sac banane élégant avec le motif Marguerite. Parfait pour garder les mains libres tout en maintenant votre style chic.',
    price: 75.00,
    currency: 'CAD',
    category: 'bags',
    tags: ['belt-bag', 'fanny-pack', 'marguerite', 'daisy', 'liberty-fabric'],
    images: ['/images/products/banane-marguerite.svg'],
    in_stock: true,
    stock_quantity: 8,
    featured: true,
  },
  {
    name: 'Cabas Hortense',
    name_fr: 'Cabas Hortense',
    slug: 'cabas-hortense',
    description: 'Spacious tote bag featuring the Hortense hydrangea pattern. Ideal for shopping, beach days, or everyday adventures.',
    description_fr: 'Grand sac cabas avec le motif Hortense hortensia. Idéal pour le shopping, la plage ou les aventures quotidiennes.',
    price: 95.00,
    currency: 'CAD',
    category: 'bags',
    tags: ['tote', 'cabas', 'hortense', 'hydrangea', 'liberty-fabric'],
    images: ['/images/products/cabas-hortense.svg'],
    in_stock: true,
    stock_quantity: 6,
    featured: true,
  },
  {
    name: 'Flora',
    name_fr: 'Flora',
    slug: 'flora',
    description: 'Elegant handbag with botanical Flora pattern. A versatile piece that transitions seamlessly from day to evening.',
    description_fr: 'Sac à main élégant avec motif botanique Flora. Une pièce polyvalente qui passe sans effort du jour au soir.',
    price: 85.00,
    currency: 'CAD',
    category: 'bags',
    tags: ['handbag', 'flora', 'botanical', 'liberty-fabric'],
    images: ['/images/products/flora.svg'],
    in_stock: true,
    stock_quantity: 7,
    featured: false,
  },
  {
    name: 'Lila',
    name_fr: 'Lila',
    slug: 'lila',
    description: 'Charming handbag featuring the Lila lilac pattern. Inspired by spring gardens and French countryside elegance.',
    description_fr: 'Charmant sac à main avec le motif Lila lilas. Inspiré des jardins printaniers et de l\'élégance de la campagne française.',
    price: 85.00,
    currency: 'CAD',
    category: 'bags',
    tags: ['handbag', 'lila', 'lilac', 'liberty-fabric'],
    images: ['/images/products/lila.svg'],
    in_stock: true,
    stock_quantity: 7,
    featured: false,
  },
  {
    name: 'Tote Bag Lily-Rose',
    name_fr: 'Tote Bag Lily-Rose',
    slug: 'tote-bag-lily-rose',
    description: 'Classic tote bag with the romantic Lily-Rose pattern. Spacious design perfect for work, travel, or weekend outings.',
    description_fr: 'Sac tote classique avec le motif romantique Lily-Rose. Design spacieux parfait pour le travail, les voyages ou les sorties du week-end.',
    price: 89.00,
    currency: 'CAD',
    category: 'bags',
    tags: ['tote', 'lily-rose', 'rose', 'liberty-fabric'],
    images: ['/images/products/tote-bag-lily-rose.svg'],
    in_stock: true,
    stock_quantity: 9,
    featured: true,
  },
  {
    name: 'Iris',
    name_fr: 'Iris',
    slug: 'iris',
    description: 'Beautiful pouch featuring the Iris floral pattern. Perfect for makeup, toiletries, or organizing small essentials.',
    description_fr: 'Belle trousse avec le motif floral Iris. Parfaite pour le maquillage, les articles de toilette ou organiser les petits essentiels.',
    price: 45.00,
    currency: 'CAD',
    category: 'pouches',
    tags: ['pouch', 'makeup-bag', 'iris', 'liberty-fabric'],
    images: ['/images/products/iris.svg'],
    in_stock: true,
    stock_quantity: 12,
    featured: true,
  },
  {
    name: 'Sakura',
    name_fr: 'Sakura',
    slug: 'sakura',
    description: 'Delicate pouch featuring the Sakura cherry blossom pattern. A touch of Japanese-inspired elegance for your daily essentials.',
    description_fr: 'Trousse délicate avec le motif Sakura fleur de cerisier. Une touche d\'élégance d\'inspiration japonaise pour vos essentiels quotidiens.',
    price: 48.00,
    currency: 'CAD',
    category: 'pouches',
    tags: ['pouch', 'makeup-bag', 'sakura', 'cherry-blossom', 'liberty-fabric'],
    images: ['/images/products/sakura.svg'],
    in_stock: true,
    stock_quantity: 12,
    featured: false,
  },
  {
    name: 'Frida Kahlo',
    name_fr: 'Frida Kahlo',
    slug: 'frida-kahlo',
    description: 'Statement jacket inspired by the vibrant artistry of Frida Kahlo. Bold floral patterns and rich colors transform your existing jacket into a wearable work of art.',
    description_fr: 'Veste statement inspirée par l\'art vibrant de Frida Kahlo. Des motifs floraux audacieux et des couleurs riches transforment votre veste existante en une œuvre d\'art portable.',
    price: 195.00,
    currency: 'CAD',
    category: 'custom-jackets',
    tags: ['jacket', 'frida-kahlo', 'custom', 'transformation', 'colorful'],
    images: ['/images/products/frida-kahlo.svg'],
    in_stock: true,
    stock_quantity: 99,
    featured: true,
  },
  {
    name: 'Personnalisées',
    name_fr: 'Veste Personnalisée',
    slug: 'personnalisees',
    description: 'Create your own custom jacket transformation. Send us your jacket and choose your preferred Liberty fabric pattern for a truly unique piece.',
    description_fr: 'Créez votre propre transformation de veste personnalisée. Envoyez-nous votre veste et choisissez votre motif Liberty préféré pour une pièce vraiment unique.',
    price: 175.00,
    currency: 'CAD',
    category: 'custom-jackets',
    tags: ['jacket', 'custom', 'personalized', 'transformation', 'bespoke'],
    images: ['/images/products/personnalisees.svg'],
    in_stock: true,
    stock_quantity: 99,
    featured: false,
  },
];

async function clearExistingProducts() {
  console.log('🧹 Clearing existing products...\n');

  // Delete product_variants first (if any exist)
  const { error: variantsError } = await supabase
    .from('product_variants')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (variantsError && variantsError.code !== 'PGRST116') {
    console.error('⚠️  Error clearing variants:', variantsError.message);
  }

  // Delete all products
  const { error: productsError } = await supabase
    .from('products')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (productsError) {
    console.error('⚠️  Error clearing products:', productsError.message);
  } else {
    console.log('✅ Existing products cleared\n');
  }
}

async function importProducts() {
  console.log('🌸 Liberty Chérie Product Import\n');
  console.log('================================\n');

  // Clear existing products first
  await clearExistingProducts();

  console.log('📦 Importing 13 products...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();

      if (error) {
        console.error(`❌ Failed to add "${product.name}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Added: ${data.name} (${data.category}) - $${data.price} CAD`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Error adding "${product.name}":`, err);
      errorCount++;
    }
  }

  console.log('\n================================');
  console.log(`\n🎉 Import complete!`);
  console.log(`   ✅ ${successCount} products added successfully`);
  if (errorCount > 0) {
    console.log(`   ❌ ${errorCount} products failed`);
  }
  console.log('\n📝 Summary by category:');
  console.log('   • Accessories: 4 products');
  console.log('   • Bags: 5 products');
  console.log('   • Pouches: 2 products');
  console.log('   • Custom Jackets: 2 products');
  console.log('\n🔗 View products at: https://libertycherie.vercel.app/products\n');
}

importProducts().catch(console.error);
