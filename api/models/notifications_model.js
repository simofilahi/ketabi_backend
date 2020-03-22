const mongose = require('mongoose')

const notificationsSchema = mongose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Notification creator
    receiver: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Ids of the receivers of the notification
    message: String, // any description of the notification message 
    read_by: [{
        readerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        read_at: { type: Date, default: Date.now }
    }],
    notificationType: {
        type: String,
        enum: ['like', 'comment', 'order']
    },
    created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Notification', notificationsSchema)