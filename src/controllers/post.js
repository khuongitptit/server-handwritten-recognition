const Post = require('../models/Post')

const getAllPost = (req, res, next) => {
    Post.find({}).then(posts => {
        res.send(posts)
    })
}
const addPost = (req, res, next) => {
    const data = req.body
    const author = data.author
    const photoUrls = data.photoUrls
    const caption = data.caption
    const newPost = {
        author,
        photoUrls,
        caption,
    }
    Post.create(newPost)
        .then(post => {
            res.send(post)
        })
        .catch(next)
}
const updatePost = (req, res, next) => {
    const data = req.body
    const author = data.author
    const photoUrls = data.photoUrls
    const caption = data.caption
    const newPost = {
        author,
        photoUrls,
        caption,
    }
    Post.update({ _id: data._id }, newPost)
        .then(post => {
            res.send(post)
        })
        .catch(next)
}

module.exports = {
    getAllPost: getAllPost,
    addPost: addPost,
    updatePost: updatePost,
}
