const mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: [true, 'Comment must be belong to a post'],
    },
    commentContent: {
        type: String,
        require: [true, 'Comment must have content'],
    },
    author: {
        type: Object,
        require: [true, 'Comment must have author'],
    },
})
const Comment = mongoose.model('comments', CommentSchema)
module.exports = Comment
