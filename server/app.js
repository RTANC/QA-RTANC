const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors');

const manualRoutes = require('./api/routes/manuals')
const personRoutes = require('./api/routes/persons')
const standardRoutes = require('./api/routes/standards')
const indicatorRoutes = require('./api/routes/indicators')
const sarRoutes = require('./api/routes/SAR')
const sarResultRoutes = require('./api/routes/sarResults')
const app = express()

app.use('/uploads/manuals/',express.static('uploads/manuals/'))
app.use(compression())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/manuals', manualRoutes)
app.use('/api/persons', personRoutes)
app.use('/api/standards', standardRoutes)
app.use('/api/indicators', indicatorRoutes)
app.use('/api/sar', sarRoutes)
app.use('/api/sarResult', sarResultRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 422).send({
        error: {
            message: err.message
        }
    })
})

module.exports = app;
