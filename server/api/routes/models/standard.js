const Sequelize = require('sequelize')
const sequelize = require('../connection')

const standard = sequelize.define('standard', {
    standardId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    year: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    institute: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    standardNo: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    standardName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    standardLvl: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = standard