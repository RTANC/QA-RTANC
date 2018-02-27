const express = require('express')
const router = express.Router()
const multer = require('multer')
const sarDocRef = require('./models/sarDocRef')
const fs = require('fs')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/DocumentRefs/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({
  storage: storage
})

router.get('/', (req, res, next) => {
    sarDocRef.findAll({
        where: {
            sarResultId: req.query.sarResultId
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

router.post('/', upload.single('docRef'), (req, res, next) => {
    sarDocRef.create({
        sarResultId: req.body.sarResultId,
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

router.delete('/', multer().array(), (req, res, next) => {
    sarDocRef.destroy({
        where: {
            docRefId: req.body.docRefId
        }
    }).then(succ => {
        fs.unlinkSync('uploads/DocumentRefs/' + req.body.filename)
        res.status(200).json('Documents deleted')
    }).catch(err => {
        next(err)
    })
})

module.exports = router