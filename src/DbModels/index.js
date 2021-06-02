const Database = require('../Database/index');
const Sequelize = require('sequelize');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = Database.sequelize;
db.userModel = require('./user')(Database, Sequelize);
module.exports = db;