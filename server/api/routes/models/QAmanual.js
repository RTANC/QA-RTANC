const Sequelize = require('sequelize')
const sequelize = require('../connection')
const QAmanual = sequelize.define('QAmanual', {
  year: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  institute: {
    type: Sequelize.TINYINT,
    primaryKey: true,
  },
  manualDept: {
    type: Sequelize.TINYINT,
    primaryKey: true,
  },
  originalName: {
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

module.exports = QAmanual
