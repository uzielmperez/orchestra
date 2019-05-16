const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000

// Middleware
app.use(express.json())
app.use(morgan('dev'))

// Connect DB
mongoose.connect(
    "mongodb://localhost:27107/token-auth-1",
    {useNewUrlParser: true},
    () => console.log("Connected to the Database")
)

// Routes


// Handle Errors
app.use((err, req, res, next) => {
    console.error(err)
    return res.status(500).send({errMsg: err.message})
})

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

