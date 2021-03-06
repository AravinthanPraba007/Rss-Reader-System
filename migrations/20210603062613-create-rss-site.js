'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('rss_site', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('rss_site');
  }
};