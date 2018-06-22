const express = require('express')
const request = require('request')
const multer = require('multer')
const indicator = require('./models/indicator')
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

router.get('/report/:sarId', (req, res, next) => {
    sar.findAll({
        where: {
            sarId: req.params.sarId
        }
    }).then(x => {
        const y =  x[0]
        indicator.findOne({
            where: {
                indicatorId: req.query.indicatorId
            }
        }).then(ind => {
            const report = {
                indicatorNo: ind.indicatorNo,
                indicatorName: ind.indicatorName,
                indicatorType: (ind.indicatorType) ? 'เชิงปริมาณ' : 'เชิงคุณภาพ',
                indicatorGain: ind.indicatorName,
                indicatorInfo: ind.indicatorInfo,
                sarResult: y.sarResult,
                goal: y.goal,
                sumResult: y.sumResult,
                goalCk: (y.goalCk) ? '&#x2713;' : '&#x2717;',
                score: y.score,
                str: y.str,
                strEnchance: y.strEnchance,
                weak: y.weak,
                weakEnchance: y.weakEnchance
            }
            const data = {"template":{"shortid":"Sk4QNy4Cf"}, data: report}
            const options = {
                url: 'http://192.168.100.10:5488/api/report',
                method: 'POST',
                json: data
            }
            request(options).pipe(res)
        })
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
