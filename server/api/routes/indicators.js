const express = require('express')
const router = express.Router()
const multer = require('multer')
const indicator = require('./models/indicator')
const standard = require('./models/standard')
const Op = require('sequelize').Op
router.get('/', (req, res, next) => {
    indicator.findAll({
        where: {
            standardId: req.query.standardId
        }
    }).then(inds => {
        res.status(200).send(inds)
    }).catch(err =>{
        next(err)
    })
})

router.get('/indicator/:id', (req, res, next) => {
    indicator.findOne({
        where: {
            indicatorId: req.params.id
        }
    }).then(inds => {
        res.status(200).send(inds)
    }).catch(err =>{
        next(err)
    })
})

router.get('/:param', (req, res, next) => {
    standard.hasMany(indicator, {foreignKey: 'standardId'})
    standard.findAll({
        where: {
            year: req.query.year,
            institute: req.query.institute,
            standardLvl: req.query.standardLvl
        },
        include: [{
            model: indicator,
            where: {
                standardId: {
                    [Op.ne]: null
                }
            }
        }]
    }).then(inds => {
        res.json(inds)
    })
})

router.post('/', multer().array(), (req, res, next) => {
    indicator.create({
        standardId: req.body.standardId,
        indicatorNo: req.body.indicatorNo,
        indicatorName: req.body.indicatorName,
        indicatorInfo: req.body.indicatorInfo,
        indicatorType: req.body.indicatorType,
        indicatorGain: req.body.indicatorGain
    }).then(succ => {
        res.status(200).send('create indicator successful')
    }).catch(err =>{
        next(err)
    })
})

router.patch('/', multer().array(), (req, res, next) => {
    indicator.update({
        indicatorNo: req.body.indicatorNo,
        indicatorName: req.body.indicatorName,
        indicatorInfo: req.body.indicatorInfo,
        indicatorType: req.body.indicatorType,
        indicatorGain: req.body.indicatorGain
    },{
        where: {
            indicatorId: req.body.indicatorId
        }
    }).then(succ => {
        res.status(200).send('indicator updated')
    }).catch(err =>{
        next(err)
    })
})

router.delete('/', (req, res, next) => {
    indicator.destroy({
        where: {
            indicatorId: req.query.indicatorId
        }
    }).then(succ => {
        res.status(200).send('incdicator deleeted')
    }).catch(err =>{
        next(err)
    })
})

module.exports = router
