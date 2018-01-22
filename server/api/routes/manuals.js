const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/manuals/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({
  storage: storage
})

router.get('/', (req, res, next) => {
  const year = req.query.year
  const institute = req.query.institute
  const manDept = req.query.manDept
  res.status(200).json({
    message: 'Manual downloading... in ' + year + ' & ' + institute + ' & ' + manDept
  })
})

router.post('/', upload.single('man'), (req, res, next) => {
  const instituteId = req.body.instituteId
  res.status(200).json({
    message: 'Manual uploading...' + instituteId
  })
})

router.delete('/', (req, res, next) => {
  res.status(200).json({
    message: 'Manual deleted'
  })
})

module.exports = router
