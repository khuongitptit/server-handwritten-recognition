const config = require('config');
const mongoose = require('mongoose');

async function init() {
  try {
    const options = { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true };
    await mongoose.connect(config.get('DB_URI'), options);
  } catch (error) {
    console.log('error', error);
  }
}
async function stop() {
  return new Promise(resolve => {
    try {
      mongoose.disconnect(() => {
        resolve();
      });
    } catch (error) {
      resolve();
    }
  });
}

module.exports = {
  init,
  stop,
};
