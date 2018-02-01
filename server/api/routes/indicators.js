const express = require('express')
const router = express.Router()
const multer = require('multer')
const indicator = require('./models/indicator')

router.get('/', (req, res, next) => {
    indicator.findAll({
        where: {
            standardId: req.query.standardId
        }
    }).then(inds => {
        res.status(200).send(inds)
    }).catch(err => {
        res.status(500).send('fatch data fail')
    })
})

router.post('/', multer().array(), (req, res, next) => {
    indicator.create({
        standardId: req.body.standardId,
        indicatorNo: req.body.indicatorNo,
        indicatorName: req.body.indicatorName,
        indicatorInfo: req.body.indicatorInfo,
        indicatorType: req.body.indicatorType
    }).then(succ => {
        res.status(200).send('create indicator successful')
    }).catch(err => {
        res.status(500).send('create indicator fail')
    })
})

router.patch('/', multer().array(), (req, res, next) => {
    indicator.update({
        indicatorNo: req.body.indicatorNo,
        indicatorName: req.body.indicatorName,
        indicatorInfo: req.body.indicatorInfo,
        indicatorType: req.body.indicatorType
    },{
        where: {
            indicatorId: req.body.indicatorId
        }
    }).then(succ => {
        res.status(200).send('indicator updated')
    }).catch(err => {
        res.status(500).send('indicator update fail')
    })
})

router.delete('/', (req, res, next) => {
    indicator.destroy({
        where: {
            indicatorId: req.query.indicatorId
        }
    }).then(succ => {
        res.status(200).send('incdicator deleeted')
    }).catch(err => {
        res.status(500).send('indicator delete fail')
    })
})

module.exports = router