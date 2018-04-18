const Sequelize = require('sequelize')
const con = require('../connection')

module.exports = con.define('sarDocRef', {
    docRefId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sarId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sarResultId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    docName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    fileName: {
        type: Sequelize.CHAR(30),
        allowNull: false
    },
    fileSize: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    fileType: {
      type: Sequelize.TEXT,
      allowNull: false
    }
})
