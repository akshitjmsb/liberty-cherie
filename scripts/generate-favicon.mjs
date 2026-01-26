import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const svgPath = join(rootDir, 'public/images/logo-icon.svg');
const svgBuffer = readFileSync(svgPath);

console.log('Generating favicon.ico...\n');

// Generate temporary PNGs at required sizes for ICO
const sizes = [16, 32, 48];
const tempPngs = [];

for (const size of sizes) {
  const buffer = await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toBuffer();
  tempPngs.push(buffer);
  console.log(`✓ Generated ${size}x${size} layer`);
}

// Convert to ICO
const icoBuffer = await pngToIco(tempPngs);
writeFileSync(join(rootDir, 'public/favicon.ico'), icoBuffer);

console.log('\n✅ favicon.ico generated successfully!');

// Check file size
const stats = readFileSync(join(rootDir, 'public/favicon.ico'));
console.log(`   Size: ${(stats.length / 1024).toFixed(1)} KB (down from 285 KB)`);
