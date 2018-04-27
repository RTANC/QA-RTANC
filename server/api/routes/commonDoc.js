const express = require('express')
const router = express.Router()
const multer = require('multer')
const commonDoc = require('./models/commonDoc')
const fs = require('fs')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/DocumentRefs/')
  },
  filename: function(req, file, cb) {
    cb(null, (req.body.fileName) ? req.body.fileName : new Date().toISOString() + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({
  storage: storage
})

router.get('/', (req, res, next) => {
    commonDoc.findAll({
        where: {
            year: req.query.year,
            catalog: req.query.catalog
        }
    }).then(docs => {
        if(docs.length === 0){
            res.status(404).send('File Not Found')
        }else{
            res.status(200).send(docs)
        }
    }).catch(err => {
        next(err)
    })
})

router.post('/', upload.single('commonDoc'), (req, res, next) => {
    commonDoc.create({
        year: req.body.year,
        catalog: req.body.catalog,
        docName: req.file.originalname,
        fileName: req.file.filename,
        fileSize: req.file.size,
        fileType: req.file.mimetype
    }).then(succ => {
        res.status(200).json('upload file success')
    }).catch(err => {
        next(err)
    })
})

router.patch('/', upload.single('commonDoc'), (req, res, next) => {
    commonDoc.update({
        docName: req.file.originalname,
        fileName: req.file.filename,
        fileSize: req.file.size,
        fileType: req.file.mimetype
    }, {
        where: {
            commonDocId: req.body.commonDocId
        }
    }).then(succ => {
        res.status(200).json('Document updated')
    }).catch(err => {
        next(err)
    })
})

router.delete('/', (req, res, next) => {
    commonDoc.destroy({
        where: {
            commonDocId: req.query.commonDocId
        }
    }).then(succ => {
        fs.unlinkSync('uploads/DocumentRefs/' + req.query.filename)
        res.status(200).json('Documents deleted')
    }).catch(err => {
        next(err)
    })
})

module.exports = router
