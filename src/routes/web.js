const express = require('express')
const router = express.Router()
const userController = require('../controllers/userprofile')
const postController = require('../controllers/post')
const likeController = require('../controllers/like')
const commentController = require('../controllers/comment')
let routes = app => {
    router.post('/userprofile', userController.userLogin)
    router.get('/userInfomation', userController.getUserInfomation)
    router.get('/post', postController.getAllPost)
    router.post('/post', postController.addPost)
    router.put('/post', postController.updatePost)
    router.post('/like', likeController.like)
    router.post('/dislike', likeController.dislike)
    router.post('/comment', commentController.addComment)

    return app.use('/', router)
}

module.exports = routes
