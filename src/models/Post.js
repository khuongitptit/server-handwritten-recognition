const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    author: {
        type: Object,
        required: [true, 'Post must have author'],
    },
    photoUrls: {
        type: Array,
        required: [true, 'Post must have at least 1 photo'],
    },
    caption: {
        type: String,
    },
})
const Post = mongoose.model('posts', PostSchema)
module.exports = Post
