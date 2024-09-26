const { User, Authenticate } = require('../models');
const auth = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

exports.updateUser = [
  auth, // Добавляем middleware для Basic Auth
  async (req, res) => {
    try {
      const { firstName, status, login, password } = req.body;

      // Проверяем, что firstName присутствует
      if (!firstName) {
        return res.status(400).json({ error: 'firstName is required' });
      }

      // Проверяем, что статус является допустимым значением
      if (status && status !== 'active' && status !== 'inactive') {
        return res.status(400).json({ error: 'Invalid status value. Must be "active" or "inactive".' });
      }

      // Находим пользователя по id
      const user = await User.findOne({ where: { id: req.params.userId } });

      // Если пользователь не найден, возвращаем ошибку
      if (!user) {
        return res.status(404).json({ error: 'User not found!' });
      }

      // Обновляем поля пользователя
      user.firstName = firstName;
      user.status = status;

      // Обновляем связанную запись аутентификации, если она существует
      if (login || password) {
        const authenticate = await Authenticate.findOne({ where: { UserId: user.id } });
        if (authenticate) {
          if (login) authenticate.login = login;
          if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            authenticate.password = hashedPassword;
          }
          await authenticate.save();
        }
      }

      // Сохраняем изменения в пользователе
      await user.save();

      // Получаем обновленного пользователя с ассоциированной записью аутентификации
      const updatedUser = await User.findOne({
        where: { id: req.params.userId },
        include: [{ model: Authenticate, as: 'Authentications' }]
      });

      // Возвращаем обновленного пользователя
      return res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];