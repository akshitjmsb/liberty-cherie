const sharp = require('sharp');
const path = require('path');

const colors = [
  { bg: '#E8A5A5', accent: '#D4858A' }, // Soft pink
  { bg: '#C5D1CB', accent: '#A8B8B0' }, // Sage green
  { bg: '#F5E6D3', accent: '#D4858A' }, // Cream with rose
  { bg: '#8A9470', accent: '#6B7355' }, // Olive
];

const products = [
  { name: 'Floral Daisy Pouch', icon: 'pouch' },
  { name: 'Victoria Rose Tote', icon: 'bag' },
  { name: 'Frida Kahlo Clutch', icon: 'clutch' },
  { name: 'Liberty Crossbody', icon: 'crossbody' },
];

async function generatePlaceholder(index) {
  const color = colors[index % colors.length];
  const product = products[index];

  // Create SVG with floral pattern hint
  const svg = `
    <svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="floral" patternUnits="userSpaceOnUse" width="100" height="100">
          <circle cx="50" cy="50" r="30" fill="${color.accent}" opacity="0.15"/>
          <circle cx="50" cy="50" r="15" fill="${color.accent}" opacity="0.2"/>
          <circle cx="20" cy="20" r="10" fill="${color.accent}" opacity="0.1"/>
          <circle cx="80" cy="80" r="10" fill="${color.accent}" opacity="0.1"/>
          <circle cx="80" cy="20" r="8" fill="${color.accent}" opacity="0.1"/>
          <circle cx="20" cy="80" r="8" fill="${color.accent}" opacity="0.1"/>
        </pattern>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.accent};stop-opacity:0.3" />
        </linearGradient>
      </defs>
      <rect width="800" height="800" fill="url(#grad)"/>
      <rect width="800" height="800" fill="url(#floral)"/>

      <!-- Product icon placeholder -->
      <g transform="translate(400, 350)">
        <rect x="-120" y="-80" width="240" height="180" rx="20" fill="${color.accent}" opacity="0.3"/>
        <rect x="-100" y="-60" width="200" height="140" rx="15" fill="white" opacity="0.5"/>
        <!-- Handle -->
        <path d="M -60 -60 Q -60 -100 0 -100 Q 60 -100 60 -60" stroke="${color.accent}" stroke-width="12" fill="none" opacity="0.6"/>
      </g>

      <!-- Brand mark -->
      <text x="400" y="520" font-family="Georgia, serif" font-size="28" fill="${color.accent}" text-anchor="middle" opacity="0.6">
        Liberty Chérie
      </text>
      <text x="400" y="555" font-family="Arial, sans-serif" font-size="18" fill="${color.accent}" text-anchor="middle" opacity="0.4">
        ${product.name}
      </text>
    </svg>
  `;

  const outputPath = path.join(__dirname, '..', 'public', 'images', 'products', `placeholder-${index + 1}.jpg`);

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log(`Created: placeholder-${index + 1}.jpg`);
}

async function main() {
  console.log('Generating placeholder images...');

  for (let i = 0; i < 4; i++) {
    await generatePlaceholder(i);
  }

  // Also create a hero image
  const heroSvg = `
    <svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="floral" patternUnits="userSpaceOnUse" width="150" height="150">
          <circle cx="75" cy="75" r="45" fill="#D4858A" opacity="0.12"/>
          <circle cx="75" cy="75" r="25" fill="#D4858A" opacity="0.15"/>
          <circle cx="30" cy="30" r="15" fill="#A8B8B0" opacity="0.1"/>
          <circle cx="120" cy="120" r="15" fill="#A8B8B0" opacity="0.1"/>
          <circle cx="120" cy="30" r="12" fill="#6B7355" opacity="0.08"/>
          <circle cx="30" cy="120" r="12" fill="#6B7355" opacity="0.08"/>
        </pattern>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FAF6F1;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#F5E6D3;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E8A5A5;stop-opacity:0.4" />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#grad)"/>
      <rect width="1200" height="1200" fill="url(#floral)"/>

      <!-- Multiple product silhouettes -->
      <g transform="translate(350, 400)">
        <rect x="-100" y="-70" width="200" height="160" rx="20" fill="#D4858A" opacity="0.25"/>
        <path d="M -50 -70 Q -50 -110 0 -110 Q 50 -110 50 -70" stroke="#D4858A" stroke-width="10" fill="none" opacity="0.4"/>
      </g>
      <g transform="translate(600, 500)">
        <rect x="-80" y="-50" width="160" height="120" rx="15" fill="#A8B8B0" opacity="0.25"/>
        <path d="M -40 -50 Q -40 -80 0 -80 Q 40 -80 40 -50" stroke="#A8B8B0" stroke-width="8" fill="none" opacity="0.4"/>
      </g>
      <g transform="translate(800, 380)">
        <rect x="-60" y="-40" width="120" height="90" rx="12" fill="#6B7355" opacity="0.2"/>
      </g>

      <!-- Brand -->
      <text x="600" y="750" font-family="Georgia, serif" font-size="42" fill="#2B3A4D" text-anchor="middle" opacity="0.5">
        Liberty Chérie Creation
      </text>
      <text x="600" y="800" font-family="Arial, sans-serif" font-size="24" fill="#6B7280" text-anchor="middle" opacity="0.4">
        Handcrafted in Quebec
      </text>
    </svg>
  `;

  const heroPath = path.join(__dirname, '..', 'public', 'images', 'hero-products.jpg');
  await sharp(Buffer.from(heroSvg))
    .jpeg({ quality: 90 })
    .toFile(heroPath);
  console.log('Created: hero-products.jpg');

  console.log('Done!');
}

main().catch(console.error);
