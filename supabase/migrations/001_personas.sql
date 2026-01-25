-- Liberty Chérie Creation - Buyer Personas Migration
-- Run this in your Supabase SQL Editor

-- ===========================================
-- PERSONAS TABLE
-- ===========================================
CREATE TABLE personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  name_fr VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  headline TEXT NOT NULL,
  headline_fr TEXT NOT NULL,
  icon VARCHAR(50),
  hero_image VARCHAR(255),
  seo_title VARCHAR(100),
  seo_title_fr VARCHAR(100),
  seo_description TEXT,
  seo_description_fr TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_personas_slug ON personas(slug);
CREATE INDEX idx_personas_active ON personas(is_active);
CREATE INDEX idx_personas_order ON personas(display_order);

-- ===========================================
-- PRODUCT-PERSONA MAPPING TABLE
-- ===========================================
CREATE TABLE product_personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  persona_id UUID REFERENCES personas(id) ON DELETE CASCADE,
  relevance_score INTEGER DEFAULT 5 CHECK (relevance_score >= 1 AND relevance_score <= 10),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, persona_id)
);

CREATE INDEX idx_product_personas_product ON product_personas(product_id);
CREATE INDEX idx_product_personas_persona ON product_personas(persona_id);
CREATE INDEX idx_product_personas_score ON product_personas(relevance_score DESC);

-- ===========================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ===========================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  language VARCHAR(2) DEFAULT 'en' CHECK (language IN ('en', 'fr')),
  interests TEXT[] DEFAULT '{}',
  source VARCHAR(50),
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active);
CREATE INDEX idx_newsletter_language ON newsletter_subscribers(language);

-- ===========================================
-- UPDATE TRIGGERS
-- ===========================================
CREATE TRIGGER update_personas_updated_at
  BEFORE UPDATE ON personas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_newsletter_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- ROW LEVEL SECURITY
-- ===========================================
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Personas: Public read
CREATE POLICY "Personas are viewable by everyone" ON personas
  FOR SELECT USING (true);

CREATE POLICY "Personas are editable by service role" ON personas
  FOR ALL USING (auth.role() = 'service_role');

-- Product Personas: Public read
CREATE POLICY "Product personas are viewable by everyone" ON product_personas
  FOR SELECT USING (true);

CREATE POLICY "Product personas are editable by service role" ON product_personas
  FOR ALL USING (auth.role() = 'service_role');

-- Newsletter: Insert by anyone, manage by service role
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Newsletter managed by service role" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Newsletter updated by service role" ON newsletter_subscribers
  FOR UPDATE USING (auth.role() = 'service_role');

-- ===========================================
-- SEED DATA - 10 BUYER PERSONAS
-- ===========================================
INSERT INTO personas (slug, name, name_fr, description, description_fr, headline, headline_fr, icon, display_order) VALUES
(
  'chic-commuter',
  'Chic City Commuter',
  'Navetteur Urbain Chic',
  'For the stylish professional who navigates the city with elegance. You appreciate functional accessories that make a statement while keeping up with your busy lifestyle.',
  'Pour le professionnel élégant qui navigue la ville avec élégance. Vous appréciez les accessoires fonctionnels qui font impression tout en suivant votre rythme de vie actif.',
  'Elevate Your Daily Commute with Handcrafted Elegance',
  'Élevez votre trajet quotidien avec une élégance artisanale',
  'briefcase',
  1
),
(
  'busy-mom',
  'Busy Quebec Mom',
  'Maman Québécoise Occupée',
  'For the multitasking mom who needs practical, beautiful accessories that can handle daily adventures. You value durability, space, and style that grows with your family.',
  'Pour la maman multitâche qui a besoin d''accessoires pratiques et beaux pour les aventures quotidiennes. Vous valorisez la durabilité, l''espace et un style qui évolue avec votre famille.',
  'Beautiful Bags for Beautiful Busy Lives',
  'De beaux sacs pour de belles vies bien remplies',
  'heart',
  2
),
(
  'ethical-minimalist',
  'Ethical Fashion Minimalist',
  'Minimaliste Mode Éthique',
  'For the conscious consumer who chooses quality over quantity. You seek timeless, handmade pieces that align with your values of sustainability and supporting local artisans.',
  'Pour le consommateur conscient qui choisit la qualité plutôt que la quantité. Vous recherchez des pièces intemporelles faites main qui correspondent à vos valeurs de durabilité et de soutien aux artisans locaux.',
  'Timeless Pieces, Thoughtfully Made',
  'Des pièces intemporelles, faites avec soin',
  'leaf',
  3
),
(
  'gift-professional',
  'Gift-Oriented Professional',
  'Professionnel Axé Cadeaux',
  'For the thoughtful gift-giver who wants to impress clients, colleagues, or loved ones with unique, high-quality presents that show you care.',
  'Pour celui qui offre des cadeaux attentionnés et veut impressionner clients, collègues ou proches avec des présents uniques et de qualité qui montrent que vous tenez à eux.',
  'Gifts That Leave a Lasting Impression',
  'Des cadeaux qui laissent une impression durable',
  'gift',
  4
),
(
  'stylish-traveler',
  'Stylish Traveler & Festival-Goer',
  'Voyageur Stylé & Amateur de Festivals',
  'For the adventurous spirit who needs compact, secure accessories for exploring. You want hands-free convenience without sacrificing style at festivals, markets, or abroad.',
  'Pour l''esprit aventurier qui a besoin d''accessoires compacts et sécurisés pour explorer. Vous voulez la commodité mains libres sans sacrifier le style aux festivals, marchés ou à l''étranger.',
  'Adventure-Ready Accessories with Artisan Flair',
  'Accessoires prêts pour l''aventure avec une touche artisanale',
  'plane',
  5
),
(
  'arts-culture',
  'Arts & Culture Lover',
  'Amateur d''Arts et Culture',
  'For the creative soul who appreciates artistic expression in everyday items. You''re drawn to our Frida Kahlo collection and pieces that tell a story.',
  'Pour l''âme créative qui apprécie l''expression artistique dans les objets du quotidien. Vous êtes attiré par notre collection Frida Kahlo et les pièces qui racontent une histoire.',
  'Wearable Art for Creative Souls',
  'De l''art à porter pour les âmes créatives',
  'palette',
  6
),
(
  'casual-dad',
  'Casual Dad / Partner',
  'Papa Décontracté / Partenaire',
  'Looking for the perfect gift for someone special? Our curated selection of bestsellers and gift sets makes finding that thoughtful present effortless.',
  'À la recherche du cadeau parfait pour quelqu''un de spécial? Notre sélection de best-sellers et coffrets cadeaux rend la recherche d''un cadeau attentionné sans effort.',
  'Find the Perfect Gift, Made Simple',
  'Trouvez le cadeau parfait, en toute simplicité',
  'search',
  7
),
(
  'market-explorer',
  'Weekend Market Explorer',
  'Explorateur de Marchés du Weekend',
  'For the local shopping enthusiast who loves discovering handmade treasures at markets. You appreciate authentic Quebec craftsmanship and supporting small businesses.',
  'Pour l''amateur de shopping local qui aime découvrir des trésors faits main aux marchés. Vous appréciez l''artisanat québécois authentique et le soutien aux petites entreprises.',
  'Discover Authentic Quebec Craftsmanship',
  'Découvrez l''artisanat québécois authentique',
  'map-pin',
  8
),
(
  'young-creative',
  'Young Creative Professional',
  'Jeune Professionnel Créatif',
  'For the trend-conscious professional who wants accessories that express their personality. You love bold colors, unique patterns, and pieces that spark conversation.',
  'Pour le professionnel conscient des tendances qui veut des accessoires exprimant sa personnalité. Vous aimez les couleurs vives, les motifs uniques et les pièces qui suscitent la conversation.',
  'Express Yourself with Bold, Beautiful Accessories',
  'Exprimez-vous avec des accessoires audacieux et beaux',
  'sparkles',
  9
),
(
  'sport-wellness',
  'Sport & Wellness Enthusiast',
  'Passionné de Sport et Bien-être',
  'For the active lifestyle lover who needs practical accessories for the gym, yoga, or outdoor activities. You want pieces that are functional yet still reflect your style.',
  'Pour l''amateur de vie active qui a besoin d''accessoires pratiques pour le gym, yoga ou activités en plein air. Vous voulez des pièces fonctionnelles qui reflètent votre style.',
  'Active Living, Artisan Style',
  'Vie active, style artisanal',
  'activity',
  10
);

-- ===========================================
-- PRODUCT-PERSONA MAPPINGS
-- Map existing products to relevant personas
-- ===========================================

-- Get persona IDs and map products
-- Note: Run this after products exist in database

-- Floral Daisy Pouch -> busy-mom, ethical-minimalist, market-explorer, sport-wellness
INSERT INTO product_personas (product_id, persona_id, relevance_score)
SELECT p.id, per.id,
  CASE per.slug
    WHEN 'busy-mom' THEN 9
    WHEN 'ethical-minimalist' THEN 8
    WHEN 'market-explorer' THEN 7
    WHEN 'sport-wellness' THEN 8
    ELSE 5
  END
FROM products p, personas per
WHERE p.slug = 'floral-daisy-pouch'
AND per.slug IN ('busy-mom', 'ethical-minimalist', 'market-explorer', 'sport-wellness')
ON CONFLICT (product_id, persona_id) DO NOTHING;

-- Victoria Rose Tote Bag -> chic-commuter, busy-mom, ethical-minimalist, gift-professional
INSERT INTO product_personas (product_id, persona_id, relevance_score)
SELECT p.id, per.id,
  CASE per.slug
    WHEN 'chic-commuter' THEN 10
    WHEN 'busy-mom' THEN 9
    WHEN 'ethical-minimalist' THEN 8
    WHEN 'gift-professional' THEN 7
    ELSE 5
  END
FROM products p, personas per
WHERE p.slug = 'victoria-rose-tote-bag'
AND per.slug IN ('chic-commuter', 'busy-mom', 'ethical-minimalist', 'gift-professional')
ON CONFLICT (product_id, persona_id) DO NOTHING;

-- Frida Kahlo Clutch -> arts-culture, gift-professional, young-creative, stylish-traveler
INSERT INTO product_personas (product_id, persona_id, relevance_score)
SELECT p.id, per.id,
  CASE per.slug
    WHEN 'arts-culture' THEN 10
    WHEN 'gift-professional' THEN 8
    WHEN 'young-creative' THEN 9
    WHEN 'stylish-traveler' THEN 7
    ELSE 5
  END
FROM products p, personas per
WHERE p.slug = 'frida-kahlo-clutch'
AND per.slug IN ('arts-culture', 'gift-professional', 'young-creative', 'stylish-traveler')
ON CONFLICT (product_id, persona_id) DO NOTHING;

-- Custom Jacket Transformation -> young-creative, ethical-minimalist, arts-culture
INSERT INTO product_personas (product_id, persona_id, relevance_score)
SELECT p.id, per.id,
  CASE per.slug
    WHEN 'young-creative' THEN 10
    WHEN 'ethical-minimalist' THEN 8
    WHEN 'arts-culture' THEN 9
    ELSE 5
  END
FROM products p, personas per
WHERE p.slug = 'custom-jacket-transformation'
AND per.slug IN ('young-creative', 'ethical-minimalist', 'arts-culture')
ON CONFLICT (product_id, persona_id) DO NOTHING;

-- Lone Flower Scrunchie Set -> sport-wellness, busy-mom, young-creative, gift-professional
INSERT INTO product_personas (product_id, persona_id, relevance_score)
SELECT p.id, per.id,
  CASE per.slug
    WHEN 'sport-wellness' THEN 10
    WHEN 'busy-mom' THEN 8
    WHEN 'young-creative' THEN 7
    WHEN 'gift-professional' THEN 6
    ELSE 5
  END
FROM products p, personas per
WHERE p.slug = 'lone-flower-scrunchie-set'
AND per.slug IN ('sport-wellness', 'busy-mom', 'young-creative', 'gift-professional')
ON CONFLICT (product_id, persona_id) DO NOTHING;
