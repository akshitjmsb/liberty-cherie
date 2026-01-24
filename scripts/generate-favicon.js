const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/favicon.png');
const outputPath = path.join(__dirname, '../public/favicon.ico');

pngToIco(inputPath)
  .then(buf => {
    fs.writeFileSync(outputPath, buf);
    console.log('Generated favicon.ico');
  })
  .catch(console.error);
