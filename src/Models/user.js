const Database = require('../Database/index');
const Sequelize = require('sequelize');
module.exports = function(Database, Sequelize){
const user = Database.sequelize.define('user', {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
      }
  }, {
    // options
    tableName: 'user'
  });
  return user;
}