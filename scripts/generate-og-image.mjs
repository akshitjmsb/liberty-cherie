import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Create OG image (1200x630)
const width = 1200;
const height = 630;

// Brand colors
const navy = '#1A2744';
const sageBlue = '#8FA5A4';
const rosePink = '#D4728C';
const cream = '#F5E6D3';

// Create SVG for the OG image
const ogSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Navy background -->
  <rect width="100%" height="100%" fill="${navy}"/>

  <!-- Decorative sage accent card -->
  <rect x="100" y="180" width="1000" height="270" rx="12" fill="${sageBlue}" opacity="0.15"/>
  <rect x="110" y="190" width="980" height="250" rx="8" fill="none" stroke="${sageBlue}" stroke-width="2" opacity="0.4"/>

  <!-- Decorative corner accents -->
  <circle cx="80" cy="80" r="40" fill="${rosePink}" opacity="0.3"/>
  <circle cx="1120" cy="80" r="30" fill="${sageBlue}" opacity="0.3"/>
  <circle cx="100" cy="550" r="35" fill="${sageBlue}" opacity="0.3"/>
  <circle cx="1100" cy="550" r="45" fill="${rosePink}" opacity="0.3"/>

  <!-- Brand name - LIBERTY -->
  <text x="600" y="290" font-family="Georgia, serif" font-size="72" font-weight="400" fill="#FFFFFF" text-anchor="middle" letter-spacing="20">LIBERTY</text>

  <!-- Brand name - chérie -->
  <text x="600" y="380" font-family="Georgia, serif" font-size="48" font-style="italic" fill="${sageBlue}" text-anchor="middle" letter-spacing="4">chérie</text>

  <!-- Tagline -->
  <text x="600" y="480" font-family="system-ui, sans-serif" font-size="24" fill="${cream}" text-anchor="middle" opacity="0.9">Sacs &amp; accessoires artisanaux</text>

  <!-- Subtle bottom accent line -->
  <line x1="400" y1="520" x2="800" y2="520" stroke="${rosePink}" stroke-width="2" opacity="0.5"/>
</svg>
`;

console.log('Generating og-image.jpg (1200x630)...\n');

await sharp(Buffer.from(ogSvg))
  .jpeg({ quality: 90 })
  .toFile(join(rootDir, 'public/og-image.jpg'));

console.log('✅ og-image.jpg generated successfully!');
