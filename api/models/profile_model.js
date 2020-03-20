const Sequelize = require('sequelize')
const user = require('./user_model')

// database
const sequelize = require('../database/db')

const profile = sequelize.define({
    date_birthday: {
        type: Sequelize.DATE
    }
})

user.hasOne(profile, {
    foreignkey: 'user_id'
})

profile.belongTo(user, {
    foreignkey: 'user_id'
})

module.exports = profile