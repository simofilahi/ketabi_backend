const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
//     },
//     password: { type: String, required: true }
// });

// const ProfileSchema = mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId },

// })

const friendsSchema = mongoose.Schema({
    friend_id: { type: Number },
})

const friendRequestsSchema = mongoose.Schema({
    friend_requested_id: { type: Number },
})

const ordersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // profile: [ProfileSchema],
    post_id: { type: mongoose.Schema.Types.ObjectId },
    book_name: { type: String }
})

const commentsShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // profile: [ProfileSchema],
    comment_id: mongoose.Schema.Types.ObjectId,
})

const messagesSchema = mongoose.Schema({
    owner_id: mongoose.Schema.Types.ObjectId,
    msg_id: mongoose.Schema.Types.ObjectId,
    profile_pic: { type: String },
    message: { type: String }
})

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    phone_number: { type: Number },
    location: { type: String, default: "None" },
    description: { type: String, default: "None" },
    interests: { type: String, default: "None" },
    profile_pic: { type: String, default: "default.png" },
    isVerified: { type: Boolean, default: 0 }
    // profile: ProfileSchema,
    // friends: [friendsSchema],
    // friend_requests: [friendRequestsSchema],
    // messages: [messagesSchema],
    // posts: [postSchema],
})

module.exports = mongoose.model('User', userSchema);
