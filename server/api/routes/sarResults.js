const express = require('express')
const sequelize = require('./connection')
const sar = require('./models/qaSAR')
const sarResult = require('./models/sarResult')
const sarDocRef = require('./models/sarDocRef')
const multer = require('multer')
const router = express.Router()
const Op = require('sequelize').Op

router.get('/other', (req, res, next) => {
    // sequelize.query('spGetOtherSarResult @indId = 2,@lvl = 0').then(p => {
    //     res.json(p)     
    // }).catch(err =>{
    //     next(err)
    // })
    sar.hasMany(sarResult, {foreignKey: 'sarId', sourceKey: 'sarId'})
    sarResult.belongsTo(sar, {foreignKey: 'sarId', targetKey: 'sarId'})

    sarResult.hasMany(sarDocRef, {foreignKey: 'sarResultId'})
    sarDocRef.belongsTo(sarResult, {foreignKey: 'sarResultId'})

    var cause = null
    if (req.query.sarLvl == 0) {
        cause = {
          [Op.between]: [1, 3]  
        }       
    } else if (req.query.sarLvl >= 1 && req.query.sarLvl <= 3) {
        cause = {
            [Op.between]: [4, 13]
        }
    }

    sar.findAll({
        attributes: ['sarLvl'],
        where: {
            indicatorId: req.query.indicatorId,
            sarLvl: cause
        },
        include: {
            model: sarResult,
            include: {
                model: sarDocRef
            }
        }
    }).then(rows => {
        res.status(200).send(rows)
    }).catch(err => {
        next(err)
    })
})

router.post('/', multer().array(), (req, res, next) => {
    sarResult.create({
        sarId: req.body.sarId,
        sarResultText: req.body.sarResultText
    }).then(succ => {
        res.status(200).json('Create Success!')
    }).catch(err => {
        next(err)
    })
})

router.patch('/', multer().array(), (req, res, next) => {
    sarResult.update({
        sarResultText: req.body.sarResultText
    }, {
        where: {
            sarResultId: req.body.sarResultId
        }
    }).then(succ => {
        res.status(200).json('Update Success!')
    }).catch(err => {
        next(err)
    })
})

router.delete('/', (req, res, next) => {
    sarResult.destroy({
        where: {
            sarResultId: req.query.sarResultId
        }
    }).then(succ => {
        res.status(200).json('Delete Success!')
    }).catch(err => {
        next(err)
    })
})

module.exports = router