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
    static associate({ UserRssSubscription, RssFeed }) {
      // define association here
      this.hasMany(UserRssSubscription, { foreignKey: 'rss_id'});
      this.hasMany(RssFeed, { foreignKey: 'rss_id'});
    }
  };
  RssSite.init({
    url: {
      type: DataTypes.STRING(3000),
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    siteLink: {
      type: DataTypes.STRING(3000)
    },
    imageUrl: {
      type: DataTypes.STRING(3000)
    },
    lastFeedFetchedAt: {
      type: DataTypes.DATE
    },
    lastPubDate: {
      type: DataTypes.DATE
    },
    feedFetchFrequency: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 60
    }
  }, {
    sequelize,
    paranoid: true,
    tableName: 'rss_site',
    modelName: 'RssSite',
  });
  return RssSite;
};