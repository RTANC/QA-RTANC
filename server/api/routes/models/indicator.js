const Sequelize = require('sequelize')
const sequelize = require('../connection')

const indicator = sequelize.define('indicator', {
    indicatorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    standardId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    indicatorName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    indicatorInfo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    indicatorType: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = indicator