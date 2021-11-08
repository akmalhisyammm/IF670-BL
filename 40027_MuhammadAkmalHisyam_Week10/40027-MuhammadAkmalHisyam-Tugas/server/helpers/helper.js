const fs = require('fs');

exports.base64_decode = (base64Data, filename) => {
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(`uploads/${filename}`, buffer);
};
