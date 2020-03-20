const Sequelize = require('sequelize');
// database
const sequelize = require('../database/db')

module.exports = sequelize.define('users',
    {
        user_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_name: {
            type: Sequelize.STRING(32),
            allowNull: false,
        },
        user_mail: {
            type: Sequelize.STRING(128),
            allowNull: false,
            unique: true,
        },
        user_pass: {
            type: Sequelize.STRING(128),
            allowNull: false,
        },
        user_status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    }
)