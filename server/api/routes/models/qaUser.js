const con = require('../connection')
const Sequelize = require('sequelize')

module.exports = con.define('qaUser', {
    person_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    standardMgr: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    manualUpload: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    commonDoc: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    userMgr: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})