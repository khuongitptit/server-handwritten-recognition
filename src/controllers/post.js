const postServices = require('../services/post');
const path = require('path');

async function addPost(request) {
  const data = request.payload;
  const authorId = request.query.userId;
  return postServices.addPost(data, authorId);
}

module.exports = {
  addPost
};
