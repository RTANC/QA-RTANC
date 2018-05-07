const express = require('express')
const router = express.Router()
const multer = require('multer')
const standard = require('./models/standard')
const indicator = require('./models/indicator')
const Op = require('sequelize').Op

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

router.post('/dup', (req, res, next )=> {
    standard.hasMany(indicator, {foreignKey: 'standardId'})
    indicator.belongsTo(standard, {foreignKey: 'standardId'})
    standard.findAll({
        where: {
            year: (req.body.year) - 1,
            institute: req.body.institute
        },
        include: [{
            model: indicator,
            where: {
                standardId: {
                    [Op.ne]: null
                }
            }
        }]
    }).then(x => {
        const std = []
        for (var i = 0;i < x.length;i++) {
            std.push({
                year: x[i].year,
                institute: x[i].institute,
                standardNo: x[i].standardNo,
                standardName: x[i].standardName,
                standardLvl: x[i].standardLvl
            })
        }

        standard.bulkCreate(std).then(y => {
                standard.findAll({
                    where: {
                        year: req.body.year,
                        institute: req.body.institute
                    }
                }).then(z => {
                    for (var i = 0;i < z.length;i++) {
                        const ind = []
                        for(var j = 0;j < x[i].indicators.length;j++) {
                            ind.push({
                                standardId: z[i].standardId,
                                indicatorNo: x[i].indicators[j].indicatorNo,
                                indicatorName: x[i].indicators[j].indicatorName,
                                indicatorInfo: x[i].indicators[j].indicatorInfo,
                                indicatorType: x[i].indicators[j].indicatorType,
                                indicatorGain: x[i].indicators[j].indicatorGain
                            })
                        }
                        indicator.bulkCreate(ind)
                    }
                })
        }).catch(err => {
            next(err)
        })

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
