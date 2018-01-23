const Sequelize = require('sequelize')
const sequelize = new Sequelize('armynurse_real3', 'sa', 'Intell1', {
  host: '192.168.100.10',
  dialect: 'mssql',
  pool: {
    max: 30,
    min: 10,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  }
})

module.exports = sequelize;
