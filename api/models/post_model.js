const Sequelize = require('sequelize')

// database
const sequelize = require('../database/db')

const posts = sequelize.define('posts', {
    user_id: {

    },
    post_id: {

    },
    post_desc: {

    },
    post_bookname: {

    },
    post_photo_id: {

    }
})


module.exports = posts
