const mongoose = require('mongoose')

const likesSchema = mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
})

module.exports = mongoose.model("like", likesSchema)