const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user_controller')

// POST ROUTES
router.post('/auth/signup', UserController.user_signup)
router.post('/auth/login', UserController.user_login)

// GET ROUTES
router.get('/users', UserController.users)
router.get('/user/:uuid', UserController.user)
router.get('/user/settings/:uuid', UserController.ProfileSettings)

module.exports = router