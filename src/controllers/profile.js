const profileServices = require('../services/profile');

async function searchProfile(request) {
  const {userId, keyword} = request.query;
  return profileServices.searchProfile(userId, keyword);
}

module.exports = {
  searchProfile
};
