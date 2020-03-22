const mongoose = require('mongoose')

const friendsRequestsSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    friendsRequested: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
        }
    ]
})

module.exports = mongoose.model("friendsRequests", friendsRequestsSchema)