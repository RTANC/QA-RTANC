const express = require('express')
const multer = require('multer')
const sarResult = require('./models/sarResult')
const router = express.Router()

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