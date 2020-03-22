const express = require('express')
const router = express.Router()
const PostController = require('../controllers/post_controller')

// CHECK AUTHENTICATION
const checkAuth = require('../middleware/check-auth')

router.post('/post/:uuid', PostController.post)
router.post('/post/like/:post_id', PostController.likes)
router.post('/post/comment/:post_id', PostController.comments)
router.post('/post/order/:post_id', PostController.orders)

router.get('/posts', PostController.getAllPosts)
router.get('/posts/:uuid', PostController.getPostByUuid)
router.get('/notifications/:uuid', PostController.getNotifications)

// Profile routes
module.exports = router