const mongoose = require('mongoose')

// DATABASE MODELS
const Chat = require('../models/chat_model')
const Message = require('../models/messages_model')


exports.chat = async (req, res, next) => {
    const room_id = req.params.room_id
    const uuid_1 = req.body.uuid_1
    const uuid_2 = req.body.uuid_2

    const newmessage = new Message({
        room_id: req.params.room_id,
        sender_id: req.body.uuid_1,
        reciver_id: req.body.uuid_2,
        message: req.body.message
    })
    newmessage.save()
        .then(result => {
            res.status(200).json({
                message: 'message sent successfully',
                data: result
            })
        })
        .catch(err => {
            res.status(401).json({
                message: 'sent of message failed',
                err: err
            })
        })
}

exports.createRoom = async (req, res, next) => {
    // check if alerday room created
    try {
        const room = await Chat.find({
            $or: [
                { $and: [{ uuid_1: req.body.uuid_1 }, { uuid_2: req.body.uuid_2 }] },
                { $and: [{ uuid_1: req.body.uuid_2 }, { uuid_2: req.body.uuid_1 }] }
            ]
        })
        // console.log({ room: room })
        if (room.length === 0) {
            const newroom = new Chat({
                _id: new mongoose.Types.ObjectId(),
                uuid_1: req.body.uuid_1,
                uuid_2: req.body.uuid_2
            })
            newroom.save()
                .then(result => {
                    res.status(200).json({
                        message: 'room created successfull',
                        data: result
                    })
                })
                .catch(err => {
                    res.status(501).json({
                        message: 'failed',
                        err: err
                    })
                })
        } else if (room.length > 0) {
            // data = room[0]
            console.log(room[0])
            // data =
            res.status(200).json({
                message: 'alerday exist',
                data: room[0]
            })
        }
    } catch {
        res.status(501).json({
            message: 'internal error'
        })
    }

}

exports.getRommsByUuid = async (req, res, next) => {
    const rooms = await Chat.find({
        $or: [
            { uuid_1: req.params.uuid }, { uuid_2: req.params.uuid }
        ]
    })
        .populate('uuid_2')
    res.status(200).json({
        message: 'my chat rooms',
        data: rooms
    })
}

exports.getMessagesByUuid = async (req, res, next) => {
    console.log(req.params.uuid)
    const messages = await Message.find({
        room_id: req.params.uuid
    })
    // .populate('reciver_id')
    console.log("messages => ", messages)
    res.status(200).json({
        message: 'my chat rooms',
        data: messages
    })
}