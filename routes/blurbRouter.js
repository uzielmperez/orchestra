const express = require('express')
const blurbRouter = express.Router()
const Blurb = require('../models/blurb')

blurbRouter.get("/", (req, res, next) => {
    Blurb.find((err, blurbs) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res
                .status(201)
                .send(blurbs)
    })
})

module.exports = blurbRouter 