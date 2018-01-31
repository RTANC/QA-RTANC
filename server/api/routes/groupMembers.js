const express = require('express')
const multer = require('multer')

const groupMember = require('./models/groupMember')
const router = express.Router()

router.get('/', (req, res, next) => {
    groupMember.findAll({
        where: {
            roleGroupId: req.query.roleGroupId
        }
    }).then(recordsets => {
        res.status(200).send(recordsets)
    }).catch(err => {
        res.status(500).send('fatch data fail')
    })
})

router.post('/', multer().array(), (req, res, next) => {
    groupMember.create({
        roleGroupId: req.body.roleGroupId,
        person_id: req.body.person_id
    }).then(succ => {
        res.status(200).send('add member successful')
    }).catch(err => {
        res.status(500).send('add member fail')
    })
})

router.delete('/', (req, res, next) => {
    groupMember.destroy({
        where: {
            memberId: req.query.memberId
        }
    }).then(succ => {
        res.status(200).send('delete member successful')
    }).catch(err => {
        res.status(500).send('delete member fail')
    })
})

module.exports = router