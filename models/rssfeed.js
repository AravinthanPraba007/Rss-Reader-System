'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RssFeed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ RssSite }) {
      // define association here
      this.belongsTo(RssSite, {foreignKey: 'rss_id'});
    }
  };
  RssFeed.init({
    rss_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING(3000)
    },
    description: {
      type: DataTypes.TEXT
    },
    summary: {
      type: DataTypes.TEXT
    },
    guid: {
      type: DataTypes.STRING(3000),
      allowNull: false,
      unique: true
    },
    pubDate: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'rss_feed',
    modelName: 'RssFeed',
  });
  return RssFeed;
};