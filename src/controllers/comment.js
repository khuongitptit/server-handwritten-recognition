const Comment = require('../models/Comment')
const addComment = (req, res, next) => {
    const comment = req.body
    console.log(comment)
    Comment.create(comment)
        .then(comment => {
            res.send(comment)
        })
        .catch(next)
}

const deleteComment = (req, res, next) => {
    const commentID = req.body
    Comment.findByIdAndRemove({ _id: commentID })
        .then(comment => {
            res.send(comment)
        })
        .catch(next)
}
module.exports = {
    addComment: addComment,
    deleteComment: deleteComment,
}
