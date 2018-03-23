const express = require('express')
const router = express.Router()
const con = require('./connection')
const user = require('./models/qaUser')

router.get('/all', (req, res, next) => {
    con.query('spGetQaUser').then(usr => {
        res.status(200).send(usr)
    }).catch(err => {
        next(err)
    })
})

router.get('/', (req, res, next) => {
    con.query('spQaUserLogin @pid=' + req.query.pid).then(usr => {
        res.status(200).send(usr[0])
    }).catch(err => {
        next(err)
    })
})

router.patch('/', (req, res, next) => {
    user.update({
        standardMgr: req.body.standardMgr,
        commonDoc: req.body.commonDoc,
        manualUpload: req.body.manualUpload
    }, {
        where: {
            person_id: req.body.person_id
        }
    }).then(succ => {
        res.status(200).send('permission has been change')
    }).catch(err => {
        next(err)
    })
})

router.post('/', (req, res, next) => {
    user.create({
        person_id: req.body.person_id
    }).then(succ => {
        res.status(200).send('user created')
    }).catch(err => {
        next(err)
    })
})

module.exports = router