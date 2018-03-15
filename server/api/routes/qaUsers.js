const express = require('express')
const router = express.Router()
const con = require('./connection')

router.get('/all', (req, res, next) => {
    con.query('spGetQaUser').then(usr => {
        res.status(200).send(usr)
    }).catch(err => {
        next(err)
    })
})

module.exports = router