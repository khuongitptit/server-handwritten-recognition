const { Image } = require('image-js');
const hog = require('hog-features');

async function extractHOG(file) {
  const image = await Image.load(file);
  const descriptor = hog.extractHOG(image, {cellSize: 16});
  return descriptor;
}
module.exports = extractHOG;