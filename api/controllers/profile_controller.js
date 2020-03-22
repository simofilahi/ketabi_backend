const mongoose = require('mongoose')

// IMPORT USER_MODEL
const User = require('../models/user_model')

exports.getProfileByUuid = (req, res, next) => {
    User.findById(
        req.params.uuid, 'profile_pic\
         username _id \
         description \
          interests', (err, profile) => {
        if (err) {
            res.status(401).json({
                message: 'profile not found',
                err: err
            })
            return;
        }
        res.status(200).json({
            message: 'succesfully',
            data: profile
        })
    })
}