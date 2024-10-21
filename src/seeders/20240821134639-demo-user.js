'use strict'

const crypto = require('crypto')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = process.env.TEST_USER_PASSWORD
    if (!password) {
      throw new Error('TEST_USER_PASSWORD is not defined in .env file')
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex')

    await queryInterface.create('users', {
      first_name: process.env.TEST_USER_FIRST_NAME,
      last_name: process.env.TEST_USER_LAST_NAME,
      middle_name: process.env.TEST_USER_MIDDLE_NAME,
      status: process.env.TEST_USER_STATUS,
      created_at: new Date(),
      updated_at: new Date()
    })

    await queryInterface.create('authentications', {
      login: process.env.TEST_USER_LOGIN,
      password: hashedPassword,
      user_id: 1
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.destroy('users', null, {})
    await queryInterface.destroy('authentications', null, {})
  }
}
