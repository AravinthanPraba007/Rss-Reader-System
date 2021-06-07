'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('rss_feed', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
        allowNull: false
      },
      pubDate: {
        type: DataTypes.DATE
      },
      rss_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'rss_site', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('rss_feed');
  }
};