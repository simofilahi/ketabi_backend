const http = require('http')
const dotenv = require('dotenv')
const app = require('./app')

// Load env vars
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

const server = http.createServer(app)
server.listen(
    PORT,
    console.log(`Server runing in ${process.env.NODE_ENV} on port ${PORT}`)
)