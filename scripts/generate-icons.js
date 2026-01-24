const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const svgPath = path.join(__dirname, '../public/images/logo-icon.svg');
const iconsDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Generate PWA icons
  for (const size of sizes) {
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
    console.log(`Generated icon-${size}x${size}.png`);
  }

  // Generate apple-touch-icon
  await sharp(svgPath)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Generate favicon sizes (for .ico, we'll use 32x32 as primary)
  await sharp(svgPath)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon.png'));
  console.log('Generated favicon.png');

  console.log('Done! Note: Convert favicon.png to favicon.ico manually or use png-to-ico package');
}

generateIcons().catch(console.error);
