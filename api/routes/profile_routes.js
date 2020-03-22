const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile_controller')


router.get('/profile/:uuid', profileController.getProfileByUuid)

module.exports = router