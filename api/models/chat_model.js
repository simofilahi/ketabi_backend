const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uuid_1: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    uuid_2: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
})

module.exports = mongoose.model("Chat", chatSchema)