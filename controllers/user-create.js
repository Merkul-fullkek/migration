const { User, Authenticate } = require('../models');
const auth = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

exports.createUser = [
  auth, // Добавляем middleware для Basic Auth
  async (req, res) => {
    try {
      const { firstName, lastName, middleName, status, login, password } = req.body;

      // Проверяем, что все необходимые поля присутствуют
      if (!firstName || !lastName || !middleName || !status || !login || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Проверяем, что модели определены
      if (!User || !Authenticate) {
        return res.status(500).json({ error: 'Models are not defined' });
      }

      // Проверяем, существует ли уже такой логин
      const existingAuthenticate = await Authenticate.findOne({ where: { login } });
      if (existingAuthenticate) {
        return res.status(400).json({ error: 'Login already exists' });
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создаем пользователя и ассоциированную запись аутентификации
      const user = await User.create(
        {
          firstName,
          lastName,
          middleName,
          status,
          Authentications: { // Используем алиас 'Authentications'
            login,
            password: hashedPassword
          }
        },
        {
          include: [{ model: Authenticate, as: 'Authentications' }] // Используем алиас 'Authentications'
        }
      );

      return res.status(201).json(user);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Unique constraint error: login already exists' });
      } else {
        return res.status(400).json({ error: error.message });
      }
    }
  }
];