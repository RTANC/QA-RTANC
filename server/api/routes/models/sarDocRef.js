const Sequelize = require('sequelize')
const con = require('../connection')

module.exports = con.define('sarDocRef', {
    docRefId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sarResultId: {
        type: Sequelize.INTEGER,
        allowNull: false
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