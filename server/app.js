const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const manualRoutes = require('./api/routes/manuals')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/manuals',manualRoutes)

module.exports = app;
