const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
  }
)

const User = sequelize.define('user', {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  middle_name: DataTypes.STRING,
  status: DataTypes.STRING
})

const Authentication = sequelize.define('authentication', {
  login: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING
})

User.hasOne(Authentication, {
  onDelete: 'CASCADE',
  hooks: true
})
Authentication.belongsTo(User)

module.exports = sequelize
