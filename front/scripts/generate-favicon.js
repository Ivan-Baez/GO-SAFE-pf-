const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, '..', 'public', 'logo.png');
const output = path.join(__dirname, '..', 'public', 'favicon.ico');

sharp(input)
  .resize(64, 64)
  .toFile(output)
  .then(() => console.log('favicon.ico creado exitosamente'))
  .catch(err => console.error('Error:', err));
