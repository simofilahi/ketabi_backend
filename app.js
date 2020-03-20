const express = require("express")
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' });

// database
const sequelize = require('./api/database/db')

// test database
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully'))
    .catch(err => console.error('Unable to connect to the database: ', err));

const app = express()

// parse incoming data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


// Routes which should handle requests
const userRoutes = require('./api/routes/user_routes')
app.use("/api", userRoutes)

// test route
app.use("/", (req, res, next) => {
    res
        .status(200)
        .json({
            message: "success"
        })
})

module.exports = app