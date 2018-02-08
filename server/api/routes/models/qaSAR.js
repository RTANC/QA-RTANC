const Sequelize = require('sequelize')
const conn = require('../connection')

module.exports = conn.define('qaSAR', {
    sarId: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false
    },
    indicatorId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    sarLvl: {
        type: Sequelize.TINYINT,
        primaryKey: true
    },
    goal: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    sumResult: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    goalCk: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    score: {
        type: Sequelize.TINYINT,
        allowNull: true
    },
    str: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    strEnchance: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    weak: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    weakEnchance: {
        type: Sequelize.TEXT,
        allowNull: true
    }
})