const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, ref: 'User' },
    phone_number: { type: Number },
    location: { type: String, default: "None" },
    description: { type: String, default: "None" },
    interests: { type: String, default: "None" },
    profile_pic: { type: String, default: "default.png" },
})

module.exports = mongoose.model("Profile", profileSchema);