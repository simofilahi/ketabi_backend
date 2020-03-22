const mongoose = require('mongoose')

// IMPORT FRIENDS_REQUEST AND FRIENDS MODEL
const FriendsRequests = require('../models/friends_request')
const Friends = require('../models/friends_model')

exports.add = (req, res, next) => {
    FriendsRequests.update(
        { _id: req.params.uuid },
        {
            $push: {
                friendsRequested: {
                    _id: req.body.friend_id
                }
            }
        },
        (err, result) => {
            if (err) {
                res.status(401).json({
                    message: "failedd",
                    err: err
                })
            } else {
                console.log(result)
                res.status(200).json({
                    message: "successsss",
                    result: result
                })
            }
        }
    )
}

exports.cancel = (req, res, next) => {
    FriendsRequests.update({ _id: req.params.uuid },
        {
            "$pull":
                { "friendsRequested": { "_id": req.body.friend_id } }
        },
        { safe: true, multi: true },
        (error, obj) => {
            if (error) {
                res.status(401).json({
                    message: 'cancel invitation failed',
                    error: error
                })
                return;
            }
            res.status(401).json({
                message: 'cancel invitation done',
                data: obj
            })
        }
    );
}

exports.accept = async (req, res, next) => {
    try {
        await FriendsRequests.update({ _id: req.params.uuid },
            {
                "$pull":
                    { "friendsRequested": { "_id": req.body.friend_id } }
            },
            { safe: true, multi: true }
        )
        Friends.update(
            { _id: req.params.uuid },
            {
                $push: {
                    friends: {
                        _id: req.body.friend_id
                    }
                }
            },
            (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: "failedd",
                        err: err
                    })
                } else {
                    console.log(result)
                    res.status(200).json({
                        message: "successsss",
                        result: result
                    })
                }
            }
        )
    } catch (error) {
        res.status(401).json({
            message: 'accpet invi failed',
        })
    }

}

exports.reject = (req, res, next) => {
    FriendsRequests.update({ _id: req.params.uuid },
        {
            "$pull":
                { "friendsRequested": { "_id": req.body.friend_id } }
        },
        { safe: true, multi: true },
        (error, obj) => {
            if (error) {
                res.status(401).json({
                    message: 'cancel invitation failed',
                    error: error
                })
                return;
            }
            res.status(401).json({
                message: 'cancel invitation done',
                data: obj
            })
        }
    );
}

exports.remove = (req, res, next) => {
    Friends.update({ _id: req.params.uuid },
        {
            "$pull":
                { "friends": { "_id": req.body.friend_id } }
        },
        { safe: true, multi: true },
        (error, obj) => {
            if (error) {
                res.status(401).json({
                    message: 'cancel invitation failed',
                    error: error
                })
                return;
            }
            res.status(401).json({
                message: 'cancel invitation done',
                data: obj
            })
        }
    );
}

exports.myResquestFriends = (req, res, next) => {
    FriendsRequests.findOne({ _id: req.params.uuid })
        .populate('friendsRequested._id')
        .exec((err, response) => {
            console.log({ response: JSON.stringify(response) })
            console.log({ err: err })
            if (err) {
                res.status(401).json({
                    message: 'failed',
                    err: err
                })
                return;
            }
            res.status(200).json({
                message: 'success',
                data: response
            })
        })
}


exports.myFriends = (req, res, next) => {
    Friends.findOne({ _id: req.params.uuid })
        .populate('friends._id')
        .exec((err, response) => {
            console.log({ response: JSON.stringify(response) })
            console.log({ err: err })
            if (err) {
                res.status(401).json({
                    message: 'failed',
                    err: err
                })
                return;
            }
            res.status(200).json({
                message: 'success',
                data: response
            })
        })
}


