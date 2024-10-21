const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT 
  }
);

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

User.hasOne(Authentication, {
  onDelete: 'CASCADE',
  hooks: true 
});
Authentication.belongsTo(User);

module.exports = sequelize;
