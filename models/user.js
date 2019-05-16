// Pull in mongoose
const mongoose = require('mongoose')
// Pull in Schema
const Schema = mongoose.Schema

// Create new Schema
const userSchema = new Schema({
    username = {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password = {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)