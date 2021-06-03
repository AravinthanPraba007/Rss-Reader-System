'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRssSubscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({RssSite}) {
      // define association here
      this.belongsTo(RssSite, {foreignKey: 'rssId'})
    }
  };
  UserRssSubscription.init({
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserRssSubscription',
  });
  return UserRssSubscription;
};