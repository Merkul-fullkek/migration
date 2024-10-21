'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const nodeEnv = process.env.NODE_ENV || 'development'

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT
}

const sequelize = config.useEnvVariable
  ? new Sequelize(process.env[config.useEnvVariable], config)
  : new Sequelize(config.database, config.username, config.password, config)

const models = fs.readdirSync(__dirname).reduce((acc, file) => {
  if (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  ) {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    console.log({ NAME: model.name })
    acc[model.name] = model
  }
  return acc
}, {})

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = {
  sequelize,
  Sequelize,
  models
}
