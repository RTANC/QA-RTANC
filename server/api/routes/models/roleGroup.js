const Sequelize = require('sequelize')
const sequelize = require('../connection')

const roleGroup =  sequelize.define('roleGroupId', {
    roleGroupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    indicatorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    groupId: {
        type: Sequelize.TINYINT,
        allowNull: false
    }
})

module.exports = roleGroup