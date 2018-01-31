const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const manualRoutes = require('./api/routes/manuals')
const personRoutes = require('./api/routes/persons')
const standardRoutes = require('./api/routes/standards')
const roleGroupRoutes = require('./api/routes/roleGroups')
const groupMemberRoutes = require('./api/routes/groupMembers')

const app = express()

app.use('/uploads/manuals/',express.static('uploads/manuals/'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/manuals', manualRoutes)
app.use('/api/persons', personRoutes)
app.use('/api/standards', standardRoutes)
app.use('/api/roleGroup', roleGroupRoutes)
app.use('/api/groupMember', groupMemberRoutes)

module.exports = app;
