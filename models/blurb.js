const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blurbSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    price: {
        type: String
    },
    image: {
        type: String,
    },
    location: {
        type: String,
    },
    type: {
        type: String,
        enum: ["Sell", "Services", "Hiring"]  
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Blurb', blurbSchema)