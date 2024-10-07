'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Authenticate, {
        foreignKey: 'UserId',
        as: 'Authentications', 
         onDelete: 'CASCADE'
      });
    }
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });

  return User;
};