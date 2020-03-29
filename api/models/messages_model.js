const mongoose = require('mongoose')

const messagesSchema = mongoose.Schema({
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    reciver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    message: { type: String },
    seen: { type: Boolean, default: 0 },
    dateCreation: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Message", messagesSchema)