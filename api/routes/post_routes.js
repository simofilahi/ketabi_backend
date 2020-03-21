const express = require('express')
const router = express.Router()
const PostController = require('../controllers/post_controller')

// CHECK AUTHENTICATION
const checkAuth = require('../middleware/check-auth')

router.post('/post/:uuid', checkAuth, PostController.post)
router.post('/post/like/:post_id', checkAuth, PostController.likes)
router.post('/post/comment/:post_id', checkAuth, PostController.comments)
router.post('/post/order/:post_id', checkAuth, PostController.orders)

router.get('/posts', PostController.getAllPosts)
router.get('/posts/:uuid', PostController.getPostByUuid)

// Profile routes
module.exports = router