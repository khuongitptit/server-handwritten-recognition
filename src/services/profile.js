const _ = require('lodash');
const Account = require('../models/Account');
const Boom = require('@hapi/boom');

async function searchProfile(userId, keyword) {
  return Account.searchByKeyword(userId, keyword);
}

module.exports = {
  searchProfile,
};
