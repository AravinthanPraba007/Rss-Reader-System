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
    static associate({RssSite, User}) {
      // define association here
      this.belongsTo(RssSite, {foreignKey: 'rss_id'});
      this.belongsTo(User, {foreignKey: 'user_id'})
    }
  };
  UserRssSubscription.init({
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    rss_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'user_rss_subscription',
    modelName: 'UserRssSubscription',
  });
  return UserRssSubscription;
};