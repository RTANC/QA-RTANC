const express = require('express')
const router = express.Router()
const multer = require('multer')
const standard = require('./models/standard')

router.get('/', (req, res, next) => {
    const year = req.query.year
    const institute = req.query.institute
    const standardLvl = req.query.standardLvl

    standard.findAll({
        where: {
            year: year,
            institute: institute,
            standardLvl: standardLvl
        }
    }).then(std => {
        res.send(std)
    })
})

router.post('/', multer().array(),(req, res, next) => {
    const std = req.body
    standard.create({
        year: std.year,
        institute: std.institute,
        standardNo: std.standardNo,
        standardName: std.standardName,
        standardLvl: std.standardLvl
    }).then(nRow => {
        res.send(nRow.dataValues)
    })   
})

module.exports = router
