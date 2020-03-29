const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
    uuid: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    // title: { type: String },
    description: { type: String },
    img: { type: String, default: 'default.png' },
    commentsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    ordersCount: { type: Number, default: 0 },
    comments: [
        {
            owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
            comment: { type: String },
        }
    ],
    likes: [
        {
            owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
        }
    ],
    orders: [
        {
            owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
            book_name: { type: String },
        }
    ],
    credentials: { type: Boolean },
    dateCreation: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Post', postsSchema)