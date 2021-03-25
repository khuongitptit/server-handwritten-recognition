const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    imageURLs: [{
        type: String,
    }],
    caption: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'accounts',
    },
  },
  { timestamps: true }
);
const Post = mongoose.model('posts', PostSchema);

async function get(id) {
  return Post.findById(id);
}
async function findOne(query) {
  return Post.findOne(query);
}
async function update(id, data) {
  return Post.updateOne({ _id: id }, data);
}
async function add(data) {
  return Post.create(data);
}

module.exports = {
  get,
  findOne,
  update,
  add,
  find: Post.find.bind(Post),
};
