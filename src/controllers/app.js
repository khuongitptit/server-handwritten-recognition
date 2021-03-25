const appServices = require('../services/app');

async function getAll(request) {
  const {userId} = request.params;
  return appServices.getAll(userId);
}

module.exports = {
  getAll
};
