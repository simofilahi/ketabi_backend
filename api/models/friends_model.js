const mongoose = require('mongoose')

const friendsSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    friends: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
        }
    ]
})

module.exports = mongoose.model('Friends', friendsSchema);