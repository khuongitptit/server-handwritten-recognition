const _ = require('lodash');
const Post = require('../models/Post');
const Boom = require('@hapi/boom');

async function addPost(data, authorId) {
  return Post.add(_.assign(data, {authorId}));
}

module.exports = {
  addPost,
};
