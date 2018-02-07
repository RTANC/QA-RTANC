const express = require('express')
const router = express.Router()
const sequelize = require('./connection')
const persons = require('./models/person')

router.get('/', (req, res, next) => {
    sequelize.query('spGetAllUser', {model: persons}).then(p => {
        res.json(p)     
    }).catch(err =>{
        next(err)
    })
})

module.exports = router