const conn = require('../connection')
const Sequelize = require('sequelize')

module.exports = conn.define('sarResult', {
    sarResultId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sarId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sarResultText: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})