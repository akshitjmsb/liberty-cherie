import { supabase } from './supabase';
import { Persona, PersonaSlug, Product } from '@/types';

// Mock data for development/fallback
const mockPersonas: Persona[] = [
  {
    id: '1',
    slug: 'chic-commuter',
    name: 'Chic City Commuter',
    name_fr: 'Navetteur Urbain Chic',
    description: 'For the stylish professional who navigates the city with elegance. You appreciate functional accessories that make a statement while keeping up with your busy lifestyle.',
    description_fr: 'Pour le professionnel élégant qui navigue la ville avec élégance. Vous appréciez les accessoires fonctionnels qui font impression tout en suivant votre rythme de vie actif.',
    headline: 'Elevate Your Daily Commute with Handcrafted Elegance',
    headline_fr: 'Élevez votre trajet quotidien avec une élégance artisanale',
    icon: 'briefcase',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'busy-mom',
    name: 'Busy Quebec Mom',
    name_fr: 'Maman Québécoise Occupée',
    description: 'For the multitasking mom who needs practical, beautiful accessories that can handle daily adventures. You value durability, space, and style that grows with your family.',
    description_fr: "Pour la maman multitâche qui a besoin d'accessoires pratiques et beaux pour les aventures quotidiennes. Vous valorisez la durabilité, l'espace et un style qui évolue avec votre famille.",
    headline: 'Beautiful Bags for Beautiful Busy Lives',
    headline_fr: 'De beaux sacs pour de belles vies bien remplies',
    icon: 'heart',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'ethical-minimalist',
    name: 'Ethical Fashion Minimalist',
    name_fr: 'Minimaliste Mode Éthique',
    description: 'For the conscious consumer who chooses quality over quantity. You seek timeless, handmade pieces that align with your values of sustainability and supporting local artisans.',
    description_fr: "Pour le consommateur conscient qui choisit la qualité plutôt que la quantité. Vous recherchez des pièces intemporelles faites main qui correspondent à vos valeurs de durabilité et de soutien aux artisans locaux.",
    headline: 'Timeless Pieces, Thoughtfully Made',
    headline_fr: 'Des pièces intemporelles, faites avec soin',
    icon: 'leaf',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'gift-professional',
    name: 'Gift-Oriented Professional',
    name_fr: 'Professionnel Axé Cadeaux',
    description: 'For the thoughtful gift-giver who wants to impress clients, colleagues, or loved ones with unique, high-quality presents that show you care.',
    description_fr: "Pour celui qui offre des cadeaux attentionnés et veut impressionner clients, collègues ou proches avec des présents uniques et de qualité qui montrent que vous tenez à eux.",
    headline: 'Gifts That Leave a Lasting Impression',
    headline_fr: 'Des cadeaux qui laissent une impression durable',
    icon: 'gift',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    slug: 'stylish-traveler',
    name: 'Stylish Traveler & Festival-Goer',
    name_fr: 'Voyageur Stylé & Amateur de Festivals',
    description: 'For the adventurous spirit who needs compact, secure accessories for exploring. You want hands-free convenience without sacrificing style at festivals, markets, or abroad.',
    description_fr: "Pour l'esprit aventurier qui a besoin d'accessoires compacts et sécurisés pour explorer. Vous voulez la commodité mains libres sans sacrifier le style aux festivals, marchés ou à l'étranger.",
    headline: 'Adventure-Ready Accessories with Artisan Flair',
    headline_fr: "Accessoires prêts pour l'aventure avec une touche artisanale",
    icon: 'plane',
    display_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    slug: 'arts-culture',
    name: 'Arts & Culture Lover',
    name_fr: "Amateur d'Arts et Culture",
    description: "For the creative soul who appreciates artistic expression in everyday items. You're drawn to our Frida Kahlo collection and pieces that tell a story.",
    description_fr: "Pour l'âme créative qui apprécie l'expression artistique dans les objets du quotidien. Vous êtes attiré par notre collection Frida Kahlo et les pièces qui racontent une histoire.",
    headline: 'Wearable Art for Creative Souls',
    headline_fr: "De l'art à porter pour les âmes créatives",
    icon: 'palette',
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    slug: 'casual-dad',
    name: 'Casual Dad / Partner',
    name_fr: 'Papa Décontracté / Partenaire',
    description: 'Looking for the perfect gift for someone special? Our curated selection of bestsellers and gift sets makes finding that thoughtful present effortless.',
    description_fr: "À la recherche du cadeau parfait pour quelqu'un de spécial? Notre sélection de best-sellers et coffrets cadeaux rend la recherche d'un cadeau attentionné sans effort.",
    headline: 'Find the Perfect Gift, Made Simple',
    headline_fr: 'Trouvez le cadeau parfait, en toute simplicité',
    icon: 'search',
    display_order: 7,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    slug: 'market-explorer',
    name: 'Weekend Market Explorer',
    name_fr: 'Explorateur de Marchés du Weekend',
    description: 'For the local shopping enthusiast who loves discovering handmade treasures at markets. You appreciate authentic Quebec craftsmanship and supporting small businesses.',
    description_fr: "Pour l'amateur de shopping local qui aime découvrir des trésors faits main aux marchés. Vous appréciez l'artisanat québécois authentique et le soutien aux petites entreprises.",
    headline: 'Discover Authentic Quebec Craftsmanship',
    headline_fr: "Découvrez l'artisanat québécois authentique",
    icon: 'map-pin',
    display_order: 8,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '9',
    slug: 'young-creative',
    name: 'Young Creative Professional',
    name_fr: 'Jeune Professionnel Créatif',
    description: 'For the trend-conscious professional who wants accessories that express their personality. You love bold colors, unique patterns, and pieces that spark conversation.',
    description_fr: "Pour le professionnel conscient des tendances qui veut des accessoires exprimant sa personnalité. Vous aimez les couleurs vives, les motifs uniques et les pièces qui suscitent la conversation.",
    headline: 'Express Yourself with Bold, Beautiful Accessories',
    headline_fr: 'Exprimez-vous avec des accessoires audacieux et beaux',
    icon: 'sparkles',
    display_order: 9,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '10',
    slug: 'sport-wellness',
    name: 'Sport & Wellness Enthusiast',
    name_fr: 'Passionné de Sport et Bien-être',
    description: 'For the active lifestyle lover who needs practical accessories for the gym, yoga, or outdoor activities. You want pieces that are functional yet still reflect your style.',
    description_fr: "Pour l'amateur de vie active qui a besoin d'accessoires pratiques pour le gym, yoga ou activités en plein air. Vous voulez des pièces fonctionnelles qui reflètent votre style.",
    headline: 'Active Living, Artisan Style',
    headline_fr: 'Vie active, style artisanal',
    icon: 'activity',
    display_order: 10,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export async function getActivePersonas(): Promise<Persona[]> {
  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching personas:', error);
    return mockPersonas;
  }

  return (data as Persona[]) || mockPersonas;
}

export async function getPersonaBySlug(slug: PersonaSlug): Promise<Persona | null> {
  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching persona:', error);
    // Fallback to mock data
    return mockPersonas.find(p => p.slug === slug) || null;
  }

  return data as Persona;
}

export async function getProductsByPersona(
  slug: PersonaSlug,
  limit?: number
): Promise<Product[]> {
  let query = supabase
    .from('product_personas')
    .select(`
      relevance_score,
      products (*)
    `)
    .eq('persona_id',
      supabase
        .from('personas')
        .select('id')
        .eq('slug', slug)
        .single()
    )
    .order('relevance_score', { ascending: false });

  // Alternative approach using a join
  const { data: personaData } = await supabase
    .from('personas')
    .select('id')
    .eq('slug', slug)
    .single();

  if (!personaData) {
    console.error('Persona not found:', slug);
    return [];
  }

  query = supabase
    .from('product_personas')
    .select(`
      relevance_score,
      products!inner (*)
    `)
    .eq('persona_id', personaData.id)
    .order('relevance_score', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products for persona:', error);
    return [];
  }

  // Extract products from the joined result
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data?.map((item: any) => item.products) || []) as Product[];
}

export async function getProductsWithPersonas(): Promise<
  Array<Product & { personas: Array<{ slug: PersonaSlug; score: number }> }>
> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_personas (
        relevance_score,
        personas (slug)
      )
    `)
    .eq('in_stock', true);

  if (error) {
    console.error('Error fetching products with personas:', error);
    return [];
  }

  return (data?.map((product) => ({
    ...product,
    personas: product.product_personas?.map((pp: { relevance_score: number; personas: { slug: PersonaSlug } }) => ({
      slug: pp.personas?.slug,
      score: pp.relevance_score,
    })) || [],
  })) || []) as Array<Product & { personas: Array<{ slug: PersonaSlug; score: number }> }>;
}

// Persona labels for display with icons
export const personaLabels: Record<PersonaSlug, {
  en: string;
  fr: string;
  icon: string;
  shortDescription: { en: string; fr: string };
}> = {
  'chic-commuter': {
    en: 'Chic City Commuter',
    fr: 'Navetteur Urbain Chic',
    icon: 'briefcase',
    shortDescription: {
      en: 'Tote bags, crossbody bags',
      fr: 'Sacs fourre-tout, sacs bandoulière',
    },
  },
  'busy-mom': {
    en: 'Busy Quebec Mom',
    fr: 'Maman Québécoise Occupée',
    icon: 'heart',
    shortDescription: {
      en: 'Large bags, pouches, sets',
      fr: 'Grands sacs, pochettes, ensembles',
    },
  },
  'ethical-minimalist': {
    en: 'Ethical Fashion Minimalist',
    fr: 'Minimaliste Mode Éthique',
    icon: 'leaf',
    shortDescription: {
      en: 'Timeless handmade pieces',
      fr: 'Pièces intemporelles faites main',
    },
  },
  'gift-professional': {
    en: 'Gift-Oriented Professional',
    fr: 'Professionnel Axé Cadeaux',
    icon: 'gift',
    shortDescription: {
      en: 'Gift sets, clutches, premium items',
      fr: 'Coffrets cadeaux, pochettes, articles premium',
    },
  },
  'stylish-traveler': {
    en: 'Stylish Traveler',
    fr: 'Voyageur Stylé',
    icon: 'plane',
    shortDescription: {
      en: 'Crossbody, compact pouches',
      fr: 'Bandoulière, pochettes compactes',
    },
  },
  'arts-culture': {
    en: 'Arts & Culture Lover',
    fr: "Amateur d'Arts et Culture",
    icon: 'palette',
    shortDescription: {
      en: 'Frida Kahlo collection, artistic pieces',
      fr: 'Collection Frida Kahlo, pièces artistiques',
    },
  },
  'casual-dad': {
    en: 'Casual Dad / Partner',
    fr: 'Papa Décontracté / Partenaire',
    icon: 'search',
    shortDescription: {
      en: 'Gift ideas, bestsellers',
      fr: 'Idées cadeaux, best-sellers',
    },
  },
  'market-explorer': {
    en: 'Weekend Market Explorer',
    fr: 'Explorateur de Marchés',
    icon: 'map-pin',
    shortDescription: {
      en: 'All handmade Quebec items',
      fr: 'Tous les articles québécois faits main',
    },
  },
  'young-creative': {
    en: 'Young Creative Professional',
    fr: 'Jeune Professionnel Créatif',
    icon: 'sparkles',
    shortDescription: {
      en: 'Colorful, trendy accessories',
      fr: 'Accessoires colorés et tendance',
    },
  },
  'sport-wellness': {
    en: 'Sport & Wellness Enthusiast',
    fr: 'Passionné de Sport et Bien-être',
    icon: 'activity',
    shortDescription: {
      en: 'Pouches, hair accessories',
      fr: 'Pochettes, accessoires pour cheveux',
    },
  },
};

// Get all persona slugs
export const allPersonaSlugs: PersonaSlug[] = [
  'chic-commuter',
  'busy-mom',
  'ethical-minimalist',
  'gift-professional',
  'stylish-traveler',
  'arts-culture',
  'casual-dad',
  'market-explorer',
  'young-creative',
  'sport-wellness',
];

// Validate if a string is a valid persona slug
export function isValidPersonaSlug(slug: string): slug is PersonaSlug {
  return allPersonaSlugs.includes(slug as PersonaSlug);
}
