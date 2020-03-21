const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

// LOAD ENV VARIABLE
dotenv.config({ path: './config/config.env' });

// CONNECT TO DB
mongoose
    .connect(process.env.DB_HOST, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

// PARSE DATA OF INCOMING REQUEST
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CORS ALLOW INCOMING REQUEST
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

// IMPORT ROUTES
const userRoutes = require('./api/routes/user_routes')
const postRoutes = require('./api/routes/post_routes')

// ROUTES WHICH SHOULD HANDLE REQUEST
app.use("/api", userRoutes)
app.use("/api", postRoutes)

// ROUTE FOR TEST THE APP IF WORK WELL OR NOT
app.use("/", (req, res, next) => {
    res
        .status(200)
        .json({
            message: "success"
        })
})

module.exports = app