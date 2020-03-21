const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
    uuid: { type: Object },
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    description: { type: String },
    img: { type: String },
    commentsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    ordersCount: { type: Number, default: 0 },
    comments: [
        {
            owner_id: { type: Object },
            text: { type: String },
        }
    ],
    likes: [
        {
            owner_id: { type: Object }
        }
    ],
    orders: [
        {
            owner_id: { type: Object },
            book_name: { type: String },
        }
    ],
    credentials: { type: Boolean },
    dateCreation: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Post', postsSchema)
