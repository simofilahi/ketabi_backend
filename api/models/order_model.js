const mongoose = require('mongoose')

const ordersSchema = mongoose.Schema({
    book_name: { type: String },
})

module.exports = mongoose.model("order", ordersSchema)