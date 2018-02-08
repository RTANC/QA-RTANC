const express = require('express')
const multer = require('multer')
const sar = require('./models/qaSAR')
const router = express.Router()

router.get('/', (req, res, next) => {
    sar.findOne({
        where: {
            indicatorId: req.query.indicatorId,
            sarLvl: req.query.sarLvl
        }
    }).then(sar => {
        res.status(200).send(sar)   
    }).catch(err => {
        next(err)
    })
})

router.post('/create', multer().array(), (req, res, next) => {
    sar.create({
        indicatorId: req.body.indicatorId,
        sarLvl: req.body.sarLvl
    }).then(created => {
        res.status(200).send(created)
    }).catch(err => {
        next(err)
    })
})

router.post('/upsert', multer().array(), (req, res, next) => {
    sar.upsert({
        indicatorId: req.body.indicatorId,
        sarLvl: req.body.sarLvl,
        goal: req.body.goal,
        sumResult: req.body.sumResult,
        goalCk: req.body.goalCk,
        score: req.body.score,
        str: req.body.str,
        strEnchance: req.body.strEnchance,
        weak: req.body.weak,
        weakEnchance: req.body.weakEnchance
    }).then(upserted => {
        res.status(200).send(upserted)
    }).catch(err => {
        next(err)
    })
})

module.exports = router