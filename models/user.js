// Pull in mongoose
const mongoose = require('mongoose')
// Pull in Schema
const Schema = mongoose.Schema

// Create new user Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    joined: {
        type: Date,
        default: Date.now
    }
})

// mongoose.model takes two arguments here, the name that
// we are giving our schema, and the schema itself
module.exports = mongoose.model('User', userSchema)