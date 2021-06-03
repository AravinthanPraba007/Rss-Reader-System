'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RssSite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserRssSubscription }) {
      // define association here
      this.hasMany(UserRssSubscription, { foreignKey: 'rssId'})
    }
  };
  RssSite.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RssSite',
  });
  return RssSite;
};