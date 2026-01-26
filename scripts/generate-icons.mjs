import sharp from 'sharp';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const svgPath = join(rootDir, 'public/images/logo-icon.svg');
const iconsDir = join(rootDir, 'public/icons');

// PWA icon sizes
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Ensure icons directory exists
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const svgBuffer = readFileSync(svgPath);

console.log('Generating PWA icons from logo-icon.svg...\n');

// Generate PWA icons
for (const size of sizes) {
  const outputPath = join(iconsDir, `icon-${size}x${size}.png`);

  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(outputPath);

  console.log(`✓ Generated ${size}x${size} icon`);
}

// Generate apple-touch-icon (180x180)
const appleTouchPath = join(rootDir, 'public/apple-touch-icon.png');
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(appleTouchPath);
console.log('✓ Generated apple-touch-icon.png (180x180)');

// Generate favicon.png (32x32)
const faviconPngPath = join(rootDir, 'public/favicon.png');
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(faviconPngPath);
console.log('✓ Generated favicon.png (32x32)');

// Generate larger favicon for ICO (48x48)
const favicon48Path = join(rootDir, 'public/favicon-48.png');
await sharp(svgBuffer)
  .resize(48, 48)
  .png()
  .toFile(favicon48Path);
console.log('✓ Generated favicon-48.png (48x48)');

console.log('\n✅ All icons generated successfully!');
console.log('\nNote: For favicon.ico, you may want to use an online converter');
console.log('or install ImageMagick to combine 16x16, 32x32, and 48x48 sizes.');
