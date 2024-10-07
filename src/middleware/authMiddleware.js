const basicAuth = require('express-basic-auth');
const { Authenticate } = require('../src/models');
const bcrypt = require('bcrypt');

// Функция для получения пользователей из базы данных
const getUsers = async () => {
  const authentications = await Authenticate.findAll({ attributes: ['login', 'password'] });
  return authentications.reduce((acc, auth) => {
    acc[auth.login] = auth.password;
    return acc;
  }, {});
};

// Настройки Basic Auth
const auth = basicAuth({
  authorizer: async (username, password, cb) => {
    const users = await getUsers();
    if (users[username]) {
      const passwordMatch = await bcrypt.compare(password, users[username]);
      if (passwordMatch) {
        return cb(null, true);
      }
    }
    return cb(null, false);
  },
  authorizeAsync: true,
  unauthorizedResponse: (req) => {
    return { error: 'Unauthorized' };
  }
});

module.exports = auth;