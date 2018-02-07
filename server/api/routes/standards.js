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
    }).catch(err =>{
        next(err)
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
    }).catch(err =>{
        next(err)
    })
})

router.patch('/', multer().array(), (req, res, next) => {
    const std = req.body
    standard.update({
        year: std.year,
        institute: std.institute,
        standardNo: std.standardNo,
        standardName: std.standardName,
        standardLvl: std.standardLvl
    }, {
        where: {
            standardId: std.standardId
        }
    }).then( result => {
        res.status(200).send('Update Success')
    }).catch(err =>{
        next(err)
    })
})

router.delete('/', (req, res, next) => {
    const stdId = req.query.standardId
    standard.destroy({
        where: {
            standardId: stdId
        }
    }).then( result => {
        res.status(200).send('Delete Success')
    }).catch(err =>{
        next(err)
    })
})

module.exports = router
