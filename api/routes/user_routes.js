const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user_controller')

router.post('/auth/signup', UserController.user_signup)
router.post('/auth/login', UserController.user_login)
router.get('/users', UserController.users)
router.get('/user/:uuid', UserController.user)

module.exports = router