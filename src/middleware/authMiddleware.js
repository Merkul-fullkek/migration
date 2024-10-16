const basicAuth = require('express-basic-auth');
const { Authenticate } = require('../models');
const crypto = require('crypto');

// Функция для получения пользователей из базы данных
const getUsers = async () => {
  const authentications = await Authenticate.findAll({ attributes: ['login', 'password'] });
  return authentications.reduce((acc, auth) => {
    acc[auth.login] = Buffer.from(auth.password, 'hex'); // Предполагается, что пароли хранятся в виде хешей в hex-формате
    return acc;
  }, {});
};

// Настройки Basic Auth
const auth = basicAuth({
  authorizer: async (username, password, cb) => {
    const users = await getUsers();
    const userPasswordHash = users[username];
    const passwordHash = crypto
    .createHash('sha256')
    .update(password)
    .digest();
    const passwordMatch = userPasswordHash && crypto.timingSafeEqual(userPasswordHash, passwordHash);
    // убрал вложенность
    return cb(null, passwordMatch);
  },
  authorizeAsync: true,
  unauthorizedResponse: (req) => {
    return { error: 'Unauthorized' };
  }
});

module.exports = auth;