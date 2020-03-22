const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
})

module.exports = mongoose.model('Comment', commentsSchema);