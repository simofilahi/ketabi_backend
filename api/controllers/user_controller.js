const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

// database model
const User = require("../models/user_model");
const Profile = require("../models/profile_model")
const FriendsRequests = require('../models/friends_request')
const Friends = require('../models/friends_model')

// Load env vars
dotenv.config({ path: './config/config.env' });

const CreatProfileDoc = async (result) => {
    try {
        const profile = new Profile({
            _id: result._id,
            username: result.username
        })
        const Friends_requests = new FriendsRequests({
            _id: result._id,
        })
        const friends = new Friends({
            _id: result._id,
        })
        await profile.save()
        await Friends_requests.save()
        await friends.save()
        return;
    } catch (err) {
        throw new Error(err)
    }
}

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                        });
                        user
                            .save()
                            .then(result => {
                                CreatProfileDoc(result)
                                    .then(r => {
                                        res.status(200).json({
                                            message: 'user created',
                                            data: result
                                        })
                                    })
                                    .catch(e => {
                                        res.status(401).json({
                                            message: 'creation user failed',
                                            error: e
                                        })
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                console.log("first")
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    console.log("second")
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_ENCRYPTION,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        uuid: user[0]._id
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.users = (req, res, next) => {
    User.find()
        .exec()
        .then(users => {
            res.status(200).json({
                data: users
            })
        })
        .catch(err => {

        })
}

exports.user = (req, res, next) => {
    console.log(req.params.uuid)
    User.findById({ profile: { _id: req.params.uuid } })
        .exec()
        .then(user => {
            res.status(200).json({
                user: user
            })
        })
        .catch(err => {
            res.status(404).json({
                err: err
            })
        })
}


exports.ProfileSettings = async (req, res, next) => {
    try {
        const settings = await User.findOne({ _id: uuid })
        if (settings) {
            res.status(200).json({
                message: 'profile settings',
                data: settings
            })
            return;
        }
        res.status(401).json({
            message: 'profile not found',
        })
    } catch (err) {
        res.status(401).json({
            message: 'profile settings failed',
            err: new Error(err)
        })
    }
}
