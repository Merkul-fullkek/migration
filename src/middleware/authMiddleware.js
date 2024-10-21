const basicAuth = require('express-basic-auth');
const { Authenticate } = require('../models');
const crypto = require('crypto');

// Функция для получения пользователей из базы данных
const getUserCreds = async (login) => {
  return Authenticate.findOne({ where: { login } });
};

// Настройки Basic Auth
const auth = basicAuth({
  authorizer: async (username, password, cb) => {
    const userCreds = await getUserCreds(username);
    if (!userCreds) {
      return cb(null, false);
    }

    const userPasswordHash = userCreds.password; 
    const passwordHash = crypto
      .createHash('sha256')
      .update(password)
      .digest();

    const passwordMatch = crypto.timingSafeEqual(Buffer.from(userPasswordHash, 'hex'), passwordHash);

    return cb(null, passwordMatch);
  },
  authorizeAsync: true,
  unauthorizedResponse: (req) => {
    return { error: 'Unauthorized' };
  }
});

module.exports = auth;