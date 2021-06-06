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
      this.hasMany(UserRssSubscription, { foreignKey: 'rss_id'});
    }
  };
  RssSite.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    siteLink: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    tableName: 'rss_site',
    modelName: 'RssSite',
  });
  return RssSite;
};