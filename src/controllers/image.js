const sampleServices = require('../services/sample');
const recognitionServices = require('../services/recognition');
async function updateSample() {
  return sampleServices.updateSammple();
}
async function recognize(request) {
  const img = request.payload.img;
  return recognitionServices.recognize(img);
}
module.exports = {
  updateSample,
  recognize
};
