const express = require('express')
const router = express.Router()
const user = require('../models/user_model')
const UserController = require('../controllers/user_controller')

router.post('/auth/signup', UserController.user_signup)
router.post('/auth/login', UserController.user_login)

module.exports = router