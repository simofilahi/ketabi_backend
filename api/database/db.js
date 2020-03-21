const dotenv = require('dotenv')
const Sequelize = require('sequelize');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Create a connection to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

module.exports = sequelize;