const express = require('express')
const router = express.Router()
const multer = require('multer')
const QAmanual = require('./models/QAmanual');
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

  QAmanual.findOne({
    where: {
      year: year,
      institute: institute,
      manualDept: manDept
    }
  }).then(man => {
    if (man === null) {
      res.status(404).send({
        message: 'ไม่พบไฟลที่ท่านค้นหา'
      })
    } else {
      var obj = man.get({
        plain: true
      })
      res.status(200).send({
        manual: man,
        url: 'http://localhost:3000/uploads/manuals/' + man.fileName
      })
    }
  })
})

router.post('/', upload.single('man'), (req, res, next) => {
  const year = req.body.year
  const institute = req.body.institute
  const manDept = req.body.manDept
  QAmanual.upsert({
    year: year,
    institute: institute,
    manualDept: manDept,
    originalName: req.file.originalname,
    fileName: req.file.filename,
    fileSize: req.file.size,
    fileType: req.file.mimetype,
  }).then(() => {
    res.status(200).send({
      message: 'Upload ไฟล์คู่มือสำเร็จ'
    })
  })
})


module.exports = router
