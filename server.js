const express = require('express')
const app = express()
// dotenv needs to be called at the initialization of server
// to create an environment (store API keys and secrets here)
// dotenv enables us to use .env files
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
// gatekeeper, checks for tokens
// will use on a specific endpoint, if that endpoint is
// triggered it goes through expressJwt first
const expressJwt = require('express-jwt')
// HEROKU WILL HAVE ITS OWN env file with a PORT, 
// the SECRET in the .env FILE will be added to HEROKU'S
// .env file
const PORT = process.env.PORT || 7000

// Middleware
// Parses incoming requests with JSON payloads
app.use(express.json())
// Morgan provides request logs
app.use(morgan('dev'))


// Connect DB
mongoose.connect(
    "mongodb://localhost:27017/orchestra",
    {
        useNewUrlParser: true,
        // NOTE: tune mongoose to remove deprecation warnings
        // useFindAndModify
        // True by default -> Set to false to make findOneAndUpdate() 
        // and findOneAndRemove() use native findOneAndUpdate() 
        // rather than findAndModify()
        useFindAndModify: false,
        // useCreateIndex
        // False by default. Set to true to make Mongoose's default index 
        // build use createIndex() instead of ensureIndex() to avoid 
        // deprecation warnings from the MongoDB driver.
        useCreateIndex: true
    },
    () => console.log("Connected to the Database")
)

// Routes
// "/auth" will route to authRouter.js (signup is /auth/signup)
app.use("/auth", require('./routes/authRouter.js'))
// the convention for routes that use expressJwt is "/api"
// "/api" uses express-jwt to check for tokens t
// any request that begins with "/api" will go throught expressJwt first
// if it finds the token AND it matches, it will decode
// the given token and creates a req.user object
// so we can say things like req.user._id
// NOTE: the expressJwt token needs to be added as HEADER
// with the request (similar to "Content-Type" -> "application/json")
// we use "Authorization" -> "Bearer TOKEN"
app.use("/api", expressJwt({ secret: process.env.SECRET}))
app.use("/api/blurb", require('./routes/blurbRouter.js'))
// app.use("/blurbs")

// Error Handler (will forward errors here via "next")
    // when an app.use is set up with all four of these parameters, EXPRESS
    // knows that this is a GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err)
    // If expressJwt doen't find a token, provide status
    // (unauthorized error doesn't provide a status by default)
    if (err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.status(500).send({errMsg: err.message})
})

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

