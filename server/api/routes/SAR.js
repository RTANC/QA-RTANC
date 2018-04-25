const express = require('express')
const multer = require('multer')
const sar = require('./models/qaSAR')
const sarDocRef = require('./models/sarDocRef')
const router = express.Router()

router.get('/', (req, res, next) => {
    // sar.hasMany(sarResult, {foreignKey: 'sarId', sourceKey: 'sarId'})
    // sarResult.belongsTo(sar, {foreignKey: 'sarId', targetKey: 'sarId'})
    sar.findAll({
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
        sarLvl: req.body.sarLvl,
        goalCk: false,
        score: 0
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
        sarResult: req.body.sarResult,
        goal: (req.body.goal === 'null') ? null : req.body.goal,
        sumResult: (req.body.sumResult === 'null') ? null : req.body.sumResult,
        goalCk: req.body.goalCk,
        score: req.body.score,
        str: (req.body.str === 'null') ? null : req.body.str,
        strEnchance: (req.body.strEnchance === 'null') ? null : req.body.strEnchance,
        weak: (req.body.weak === 'null') ? null : req.body.weak,
        weakEnchance: (req.body.weakEnchance === 'null') ? null : req.body.weakEnchance
    }).then(upserted => {
        res.status(200).send(upserted)
    }).catch(err => {
        next(err)
    })
})

module.exports = router
