const express = require('express')
const app = express()
// dotenv needs to be called at the initialization of server
// to create an environment (store API keys and secrets here)
// dotenv enables us to use .env files
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
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
    "mongodb://localhost:27017/token-auth-1",
    {useNewUrlParser: true},
    () => console.log("Connected to the Database")
)

// Routes
// "/auth" will route to authRouter.js (signup is /auth/signup)
app.use("/auth", require('./routes/authRouter.js'))

// Error Handler (will forward errors here via "next")
    // when an app.use is set up with all four of these parameters, EXPRESS
    // knows that this is a GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err)
    return res.status(500).send({errMsg: err.message})
})

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

