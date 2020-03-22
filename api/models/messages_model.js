const mongoose = require('mongoose')

const messagesSchema = mongoose.Schema({
    owner_id: mongoose.Schema.Types.ObjectId,
    msg_id: mongoose.Schema.Types.ObjectId,
    profile_pic: { type: String },
    message: { type: String }
})

module.exports = mongoose.model("messages", messagesSchema)