const Sequelize = require('sequelize');

module.exports.sequelize = new Sequelize('test', 'aravinthan', '', {
    host: 'localhost',
    dialect: 'postgres' 
  });


