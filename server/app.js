const express = require('express')
const manualRoutes = require('./api/routes/manuals')

const app = express()

app.use('/manuals',manualRoutes)

module.exports = app;
