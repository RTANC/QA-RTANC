const express = require('express')
const router = express.Router()
router.get('/:param1/:param2', (req,res,next) => {
  const param1 = req.params.param1
  const param2 = req.params.param2
  res.status(200).json({
    message: 'Manual downloading... with '+ param1+ ' & '+param2
  })
})

router.post('/', (req,res,next) => {
  res.status(200).json({
    message: 'Manual uploading...'
  })
})

router.delete('/', (req,res,next) => {
  res.status(200).json({
    message: 'Manual deleted'
  })
})

module.exports = router
