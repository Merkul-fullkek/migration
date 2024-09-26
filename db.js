const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

const User = sequelize.define('User', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  middleName: DataTypes.STRING,
  status: DataTypes.STRING
});

const Authentication = sequelize.define('Authentication', {
  login: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING
});

User.hasOne(Authentication);
Authentication.belongsTo(User);

module.exports = sequelize;
