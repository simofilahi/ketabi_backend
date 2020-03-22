const express = require('express')
const router = express.Router()
const FriendsController = require('../controllers/friends_controller')

// POST ROUTES
router.post('/friend/add/:uuid', FriendsController.add)
router.post('/friend/cancel/:uuid', FriendsController.cancel)
router.post('/friend/reject/:uuid', FriendsController.reject)
router.post('/friend/accept/:uuid', FriendsController.accept)
router.post('/friend/remove/:uuid', FriendsController.remove)

// GET ROUTES
router.get('/friend/request/:uuid', FriendsController.myResquestFriends)
router.get('/friend/myfriends/:uuid', FriendsController.myFriends)

module.exports = router
