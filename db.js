const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.json').development;

const sequelize = new Sequelize('userpanel', 'postgres', 'agugih48', {
  host: '172.17.0.2',
  dialect: 'postgres'
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
