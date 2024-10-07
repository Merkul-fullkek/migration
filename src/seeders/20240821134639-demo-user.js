'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash(process.env.TEST_USER_PASSWORD, 10);

    await queryInterface.bulkInsert('Users', [{
      firstName: process.env.TEST_USER_FIRST_NAME,
      lastName: process.env.TEST_USER_LAST_NAME,
      middleName: process.env.TEST_USER_MIDDLE_NAME,
      status: process.env.TEST_USER_STATUS,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Authentications', [{
      login: process.env.TEST_USER_LOGIN,
      password: hashedPassword,
      UserId: 1, 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Authentications', null, {});
  }
};