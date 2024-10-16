'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Authenticate extends Model {
    static associate(models) {
      Authenticate.belongsTo(models.User, {
        foreignKey: 'id',
        as: 'User' 
      });
    }
  }

  Authenticate.init({
    login: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Authenticate',
    tableName: 'Authentications',
  });

  return Authenticate;
};