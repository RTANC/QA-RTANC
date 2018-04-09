const Sequelize = require('sequelize')
const con = require('../connection')

module.exports = con.define('commonDoc', {
    commonDocId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    catalog: {
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
