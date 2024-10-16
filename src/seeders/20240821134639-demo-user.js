'use strict';

const crypto = require('crypto');
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = process.env.TEST_USER_PASSWORD;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const user = await queryInterface.sequelize.models.User.create({
      firstName: process.env.TEST_USER_FIRST_NAME,
      lastName: process.env.TEST_USER_LAST_NAME,
      middleName: process.env.TEST_USER_MIDDLE_NAME,
      status: process.env.TEST_USER_STATUS,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await queryInterface.sequelize.models.Authentication.create({
      login: process.env.TEST_USER_LOGIN,
      password: hashedPassword,
      UserId: user.id, 
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Authentications', null, {});
  }
};