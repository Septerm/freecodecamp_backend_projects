const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    originalUrl: String,
    newUrl: String
})

module.exports = mongoose.model("Link", linkSchema)