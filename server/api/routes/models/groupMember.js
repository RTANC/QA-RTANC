const Sequelize = require('sequelize')
const sequelize = require('../connection')

const groupMember = sequelize.define('groupMember', {
    memberId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    person_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = groupMember