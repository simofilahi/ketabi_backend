const mongoose = require('mongoose')

// DATABASE MODEL
const Post = require('../models/post_model')

// HANDLE NEW POST
exports.post = (req, res, next) => {
    Post.findOne({ uuid: req.params.uuid })
        .populate('comments.owner_id', 'profile_pic username')
        .populate('likes.owner_id', 'profile_pic username')
        .populate('orders.owner_id', 'profile_pic username')
        .exec((err, post) => {
            if (!post) {
                const newpost = new Post({
                    uuid: req.params.uuid,
                    _id: new mongoose.Types.ObjectId(),
                    title: req.body.title,
                    description: req.body.description
                });
                newpost
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "post created",
                            data: result,
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'creation of post failed',
                            err: err
                        });
                    });
            } else {
                const newpost = new Post({
                    uuid: req.params.uuid,
                    _id: new mongoose.Types.ObjectId(),
                    title: req.body.title,
                    description: req.body.description
                });
                newpost.save()
                    .then(response => {
                        res.status(200).json({
                            response: response
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            error: error
                        })
                    })
            }
        })
}

// GET ALL POSTS IN DATABASE
exports.getAllPosts = (req, res, next) => {
    Post.find({})
        .populate('uuid', 'profile_pic username')
        .populate('comments.owner_id', 'profile_pic username')
        .populate('likes.owner_id', 'profile_pic username')
        .populate('orders.owner_id', 'profile_pic username')
        .exec((err, posts) => {
            if (err) {
                res.status(401).json({
                    data: err
                })
                return;
            }
            res.status(200).json({
                data: posts
            })
        })
}

// GET POSTS OF USER BY UUID
exports.getPostsByUuid = (req, res, next) => {
    Post.find({ uuid: req.params.uuid }, (err, post) => {
        if (err) {
            res.status(401).json({
                message: "failed",
                error: err
            })
        } else {
            res.status(200).json({
                message: "successfully",
                data: post
            })
        }
    })
}

// STORE  COUNT OF LIKES AND OTHER INFO LIKE THE OWNER OF THIS LIKE
exports.likes = (req, res, next) => {
    const post_id = req.params.post_id

    const newLike = {
        owner_id: req.body.owner_id,
    }
    Post.update(
        { _id: post_id },
        {
            $push: { likes: newLike },
            $inc: { likesCount: 1 }
        },
        (err, result) => {
            if (err) {
                res.status(401).json({
                    message: "failed",
                    err: err
                })
            } else {
                res.status(200).json({
                    message: "success",
                    result: result
                })
            }
        })
}

// // STORE  COUNT OF COMMENTS AND OTHER INFO LIKE THE OWNER OF THIS COMMENT
exports.comments = (req, res, next) => {
    const post_id = req.params.post_id

    const newComment = {
        owner_id: req.body.owner_id,
        comment: req.body.comment
    }
    console.log(newComment)
    console.log(post_id)
    Post.update(
        { _id: post_id },
        {
            $push: { comments: newComment },
            $inc: { commentsCount: 1 }
        },
        (err, result) => {
            if (err) {
                res.status(401).json({
                    message: "failed",
                    err: err
                })
            } else {
                res.status(200).json({
                    message: "success",
                    result: result
                })
            }
        })
}

// // STORE COUNT OF ORDER FOR A BOOK AND OTHER INFO LIKE THE OWNER OF THIS ORDER
exports.orders = (req, res, next) => {
    const post_id = req.params.post_id

    const newOrder = {
        owner_id: req.body.owner_id,
        book_name: req.body.book_name
    }
    Post.update(
        { _id: post_id },
        {
            $push: { orders: newOrder },
            $inc: { ordersCount: 1 }
        },
        (err, result) => {
            if (err) {
                res.status(401).json({
                    message: "failed",
                    err: err
                })
            } else {
                res.status(200).json({
                    message: "success",
                    result: result
                })
            }
        })
}


// exports.getNotifications = (req, res, next) => {

// }

