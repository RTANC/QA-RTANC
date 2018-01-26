const Sequelize = require('sequelize')
const sequelize = require('../connection')
const person = sequelize.define('person', {
    person_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    person_fullname: {
        type: Sequelize.STRING(500)
    }
})

module.exports = person