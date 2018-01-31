const express = require('express')
const multer = require('multer')
const roleGroup = require('./models/roleGroup')

const router = express.Router()

router.get('/', (req, res, next) => {
    roleGroup.findAll({
        where: {
            indicatorId: req.query.indicatorId
        }
    }).then(records => {
        res.status(200).send(records)
    }).catch(err => {
        res.status(500).send('fatch data fail')
    })
})

router.post('/', multer().array(), (req, res, next) => {
    roleGroup.create({
        indicatorId: req.body.indicatorId,
        groupId: req.body.groupId
    }).then(succ => {
        res.status(200).send('add roleGroup successful')
    }).catch(err => {
        res.status(500).send('add roleGroup fail')
    })
})

router.delete('/', (req, res, next) => {
    roleGroup.destroy({
        where: {
            roleGroupId: req.query.roleGroupId
        }
    })
})

module.exports = router