const Sequelize = require('sequelize')
const sequelize = require('../connection')

const indicator = sequelize.define('indicators', {
    indicatorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    standardId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    indicatorNo: {
        type: Sequelize.TINYINT,
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
    },
    indicatorGain: {
      type: Sequelize.TEXT,
      allowNull: true
    }
})

module.exports = indicator
