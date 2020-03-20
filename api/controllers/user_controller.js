const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const User = require("../models/user_model");
const Sequelize = require("sequelize");

// Load env vars
dotenv.config({ path: './config/config.env' });

exports.user_signup = async (req, res, next) => {
    var query = {
        where: Sequelize.or(
            { user_name: req.body.user_name },
            { user_mail: req.body.user_mail }
        )
    }
    const user = await User.findOne(query)
    if (user) {
        return res.status(409).json({
            message: "Mail exists"
        });
    } else {
        bcrypt.hash(req.body.user_pass, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                User.create({
                    user_name: req.body.user_name,
                    user_mail: req.body.user_mail,
                    user_pass: hash,
                })
                    .then(result => {
                        res.status(200).json({
                            message: 'user created successfully',
                            data: result
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(401).json({
                            message: 'creation of user failed',
                            data: err
                        })
                    })
            }
        })
    }
};

exports.user_login = async (req, res, next) => {
    var query = {
        where: { user_mail: req.body.user_mail }
    }
    const user = await User.findOne(query)
    if (user) {
        console.log({ user: user.dataValues.user_pass })
        bcrypt.compare(req.body.user_pass, user.dataValues.user_pass, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: user.dataValues.user_mail,
                        userId: user.dataValues.user_id
                    },
                    process.env.JWT_ENCRYPTION,
                    {
                        expiresIn: process.env.JWT_EXPIRATION
                    }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                });
            }
            res.status(401).json({
                message: "Auth failed"
            });
        })
    } else {
        res.status(500).json({
            error: err
        });
    }
};