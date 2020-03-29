const express = require('express')
const routes = express.Router()
const ChatControllers = require('../controllers/chat_controller')

// POST ROUTES
routes.post('/chat/createroom', ChatControllers.createRoom)
routes.post('/chat/:room_id', ChatControllers.chat)

// GET ROUTES
routes.get('/chat/rooms/:uuid', ChatControllers.getRommsByUuid)
routes.get('/chat/messages/:uuid', ChatControllers.getMessagesByUuid)

module.exports = routes