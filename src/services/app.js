const _ = require('lodash');
const Post = require('../models/Post');
const Boom = require('@hapi/boom');

async function getAll(userId) {
  console.log("userId");
  return "ok"
}

module.exports = {
  getAll,
};
