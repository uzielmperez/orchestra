const express = require('express')
const postRouter = express.Router()
const Blurb = require('../models/blurb')

// POST
// Create a new post
// the endpoint on the server is already "/api/blurb"
// and this will trigger the "/" endpoint below
postRouter.post("/", (req, res, next) => {
    // take the req.body and ADD a .user
    // and set that user qual to the req.user._id
    // the req.user object is created by expressJwt
    // when this route is triggered successfully 
    // the USER's ID will be ASSIGNED to the
    // BLURB that's being created
    req.body.user = req.user._id
    // create a variable the holds a new Blurb
    // with the req.body as its contents
    const newBlurb = new Blurb(req.body)
    // save newBlurb to DB
        // takes two arguments, err (if an error occurs)
        // or what to do with the response if successful 
        // (the savedBlurb BSON object)
    newBlurb.save((err, savedBlurb) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res  
                .status(201)
                .send(savedBlurb)
    })
})

module.exports = postRouter