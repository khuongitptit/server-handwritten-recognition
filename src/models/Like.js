const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: [true, 'Like must be belong to a post'],
    },
    author: {
        type: Object,
        required: [true, 'Like must have an author'],
    },
})
const Like = mongoose.model('likes', LikeSchema)
module.exports = Like
