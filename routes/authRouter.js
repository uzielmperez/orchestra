const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')



// Signup
// Check if the user already exists
    // if yes, throw error
    // if no, create new user, save in DB, and send back token
// .post takes two arguments here: 
// 1st.
// POST route
// 2nd.
// requestOBJECT, responseOBJECT, nextFUNCTION (when invoked, executes the
// "next" middleware in the stack. If the current middleware function does
// not end the request-response cycle, you MUST call next or the request
// will be left hanging at the current middleware)
authRouter.post("/signup", (req, res, next) => {
// .findOne is a mongoose query method to check if user already exists
// and takes two arguments
// 1st.
// check if there is an existing User object in our database
// with a username that is equal to the username provided in the
// request (toLowerCase String method to resolve any casing issues)
// 2nd. 
// if there's an error, handle error
// check for user
    // if user, 
        // .findOne will send back User object
    // if not,
        // .findOne will send back "null"
    User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        // if user already exists (username is already taken)
        // i.e. if (user !== null)
        if (user) {
            // Send back a 400 status code, and forward error
            // description to error handler
            res.status(400)
            return next(new Error("This username already exists."))
        }
        // if "user" IS equal to NULL (i.e. if that user doesn't exist yet)
        // CREATE USER
        const newUser = new User(req.body)
        // !!!!use mongoose .save method to try saving the 
        // newUser in DB, return err or savedUser
        newUser.save((err, savedUser) => {
            // if error, use error handler
            if (err) {
                res.status(500)
                return next(err)
            }
            // if save is successfull, create token
            // send token to the frontend
            // .sign is used to GENERATE TOKEN
                // takes two arguments
                // jwt.sign(payload, signature/secret)
                    // Payload
                    // NOTE: savedUser is coming back from 
                    // the DB as a BSON object, we need to 
                    // turn it into a JS object using .toObject, 
                    // which will then be used as the payload
                        // Note: .toObject is a mongoose method
                    // Signature
                    // Point to our SECRET environment variable
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            // return a success status, then send token to the frontend
            return res
                    .status(201)
                    .send({user: savedUser.toObject(), token})
        })
    })
})

//LOGIN
// Check if user exists in DB
    // if so, does password match user's password
        // Create token, send user object and token to front end
authRouter.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        // if user does not exist in DB or if the password is wrong
        if (!user || user.password !== req.body.password) {
            res.status(500)
            return next(new Error("Username or password are incorrect."))
        }
        // if username and password exist and match, create token and send back
        // user object and token
        const token = jwt.sign(user.toObject(), process.env.SECRET)
        return res
            .status(200)
            .send({user: user.toObject(), token})
    })
})


module.exports = authRouter


