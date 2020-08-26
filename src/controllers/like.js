const Like = require('../models/Like')
const like = (req, res, next) => {
    const like = req.body

    Like.create(like)
        .then(like => {
            res.send(like)
        })
        .catch(next)
}

const dislike = (req, res, next) => {
    const likeID = req.body
    Like.findByIdAndRemove({ _id: likeID })
        .then(like => {
            res.send(like)
        })
        .catch(next)
}
module.exports = {
    like: like,
    dislike: dislike,
}
