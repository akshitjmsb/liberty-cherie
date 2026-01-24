-- Liberty Chérie Creation Database Schema
-- Run this in your Supabase SQL Editor

-- Use gen_random_uuid() which is built into PostgreSQL 13+

-- ===========================================
-- PRODUCTS TABLE
-- ===========================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_fr VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  description_fr TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'CAD',
  images TEXT[] DEFAULT '{}',
  category VARCHAR(50) NOT NULL CHECK (category IN ('bags', 'pouches', 'accessories', 'custom-jackets', 'other')),
  tags TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_slug ON products(slug);

-- ===========================================
-- PRODUCT VARIANTS TABLE (for size/color options)
-- ===========================================
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  price_modifier DECIMAL(10, 2) DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_variants_product ON product_variants(product_id);

-- ===========================================
-- ORDERS TABLE
-- ===========================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'CAD',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  stripe_payment_intent_id VARCHAR(255),
  stripe_session_id VARCHAR(255),
  tracking_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);

-- ===========================================
-- CUSTOM ORDER REQUESTS TABLE
-- ===========================================
CREATE TABLE custom_order_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  request_type VARCHAR(50) NOT NULL CHECK (request_type IN ('jacket-customization', 'custom-bag', 'custom-pouch', 'other')),
  description TEXT NOT NULL,
  reference_images TEXT[] DEFAULT '{}',
  preferred_colors TEXT,
  preferred_fabrics TEXT,
  budget_range VARCHAR(50),
  timeline VARCHAR(100),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled')),
  quoted_price DECIMAL(10, 2),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_custom_orders_email ON custom_order_requests(customer_email);
CREATE INDEX idx_custom_orders_status ON custom_order_requests(status);

-- ===========================================
-- CONTACT MESSAGES TABLE
-- ===========================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- HELPER FUNCTIONS
-- ===========================================

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'LC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION generate_order_number();

-- Function to generate custom order request numbers
CREATE OR REPLACE FUNCTION generate_request_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.request_number := 'COR-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_request_number
  BEFORE INSERT ON custom_order_requests
  FOR EACH ROW
  WHEN (NEW.request_number IS NULL)
  EXECUTE FUNCTION generate_request_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_custom_orders_updated_at
  BEFORE UPDATE ON custom_order_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_order_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Products: Public read, admin write
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Products are editable by service role" ON products
  FOR ALL USING (auth.role() = 'service_role');

-- Product Variants: Public read
CREATE POLICY "Variants are viewable by everyone" ON product_variants
  FOR SELECT USING (true);

CREATE POLICY "Variants are editable by service role" ON product_variants
  FOR ALL USING (auth.role() = 'service_role');

-- Orders: Service role only (we use server-side API)
CREATE POLICY "Orders managed by service role" ON orders
  FOR ALL USING (auth.role() = 'service_role');

-- Custom Order Requests: Insert by anyone, manage by service role
CREATE POLICY "Anyone can create custom order requests" ON custom_order_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Custom orders managed by service role" ON custom_order_requests
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Custom orders updated by service role" ON custom_order_requests
  FOR UPDATE USING (auth.role() = 'service_role');

-- Contact Messages: Insert by anyone, read by service role
CREATE POLICY "Anyone can send contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Contact messages readable by service role" ON contact_messages
  FOR SELECT USING (auth.role() = 'service_role');

-- ===========================================
-- SAMPLE DATA (Optional - remove in production)
-- ===========================================

INSERT INTO products (name, name_fr, slug, description, description_fr, price, category, tags, featured, in_stock, stock_quantity, images) VALUES
(
  'Floral Daisy Pouch',
  'Pochette Marguerite Florale',
  'floral-daisy-pouch',
  'A beautiful handcrafted pouch featuring our signature daisy floral pattern. Perfect for storing makeup, toiletries, or small accessories. Made with premium Liberty fabric.',
  'Une belle pochette artisanale avec notre motif floral marguerite signature. Parfaite pour ranger le maquillage, les articles de toilette ou les petits accessoires. Fabriquée avec du tissu Liberty premium.',
  45.00,
  'pouches',
  ARRAY['floral', 'daisy', 'liberty-fabric', 'handmade'],
  true,
  true,
  10,
  ARRAY['/images/products/daisy-pouch-1.jpg', '/images/products/daisy-pouch-2.jpg']
),
(
  'Victoria Rose Tote Bag',
  'Sac Fourre-tout Rose Victoria',
  'victoria-rose-tote-bag',
  'An elegant tote bag featuring the Victoria rose pattern. Spacious enough for daily essentials with a secure interior pocket. Handmade in Saint-Sauveur.',
  'Un élégant sac fourre-tout avec le motif rose Victoria. Assez spacieux pour les essentiels quotidiens avec une poche intérieure sécurisée. Fait main à Saint-Sauveur.',
  85.00,
  'bags',
  ARRAY['rose', 'victoria', 'tote', 'handmade', 'daily-use'],
  true,
  true,
  5,
  ARRAY['/images/products/victoria-tote-1.jpg', '/images/products/victoria-tote-2.jpg']
),
(
  'Frida Kahlo Collection Clutch',
  'Pochette Collection Frida Kahlo',
  'frida-kahlo-clutch',
  'Inspired by the vibrant artistry of Frida Kahlo, this clutch features bold floral patterns and rich colors. A statement piece for special occasions.',
  'Inspirée par l''art vibrant de Frida Kahlo, cette pochette présente des motifs floraux audacieux et des couleurs riches. Une pièce de caractère pour les occasions spéciales.',
  65.00,
  'accessories',
  ARRAY['frida-kahlo', 'clutch', 'special-occasion', 'colorful'],
  true,
  true,
  8,
  ARRAY['/images/products/frida-clutch-1.jpg', '/images/products/frida-clutch-2.jpg']
),
(
  'Custom Jacket Transformation',
  'Transformation de Veste Personnalisée',
  'custom-jacket-transformation',
  'Transform your denim or leather jacket with our custom floral appliqué service. Send us your jacket and we''ll add beautiful Liberty fabric accents to make it uniquely yours.',
  'Transformez votre veste en jean ou en cuir avec notre service d''appliqué floral personnalisé. Envoyez-nous votre veste et nous ajouterons de beaux accents en tissu Liberty pour la rendre unique.',
  150.00,
  'custom-jackets',
  ARRAY['custom', 'jacket', 'transformation', 'personalized'],
  false,
  true,
  99,
  ARRAY['/images/products/custom-jacket-1.jpg', '/images/products/custom-jacket-2.jpg']
),
(
  'Lone Flower Hair Scrunchie Set',
  'Ensemble de Chouchous Fleur Solitaire',
  'lone-flower-scrunchie-set',
  'Set of 3 handmade scrunchies featuring our Lone Flower pattern. Gentle on hair while adding a touch of elegance to any hairstyle.',
  'Ensemble de 3 chouchous faits main avec notre motif Fleur Solitaire. Doux pour les cheveux tout en ajoutant une touche d''élégance à n''importe quelle coiffure.',
  28.00,
  'accessories',
  ARRAY['scrunchie', 'hair-accessory', 'set', 'lone-flower'],
  false,
  true,
  20,
  ARRAY['/images/products/scrunchie-set-1.jpg']
);

-- Add some variants
INSERT INTO product_variants (product_id, name, price_modifier, in_stock)
SELECT id, 'Small', 0, true FROM products WHERE slug = 'floral-daisy-pouch'
UNION ALL
SELECT id, 'Large', 10.00, true FROM products WHERE slug = 'floral-daisy-pouch';
