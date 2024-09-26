const { User, Authenticate } = require('../models');
const auth = require('../middleware/authMiddleware');

exports.deleteUser = [
  auth, // Добавляем middleware для Basic Auth
  async (req, res) => {
    try {
      const UserId = req.params.userId;

      // Удаляем связанную запись аутентификации
      const deletedAuthenticate = await Authenticate.destroy({
        where: { UserId }
      });

      // Удаляем пользователя
      const deletedUser = await User.destroy({
        where: { id: UserId }
      });

      // Если пользователь не найден, возвращаем ошибку
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Возвращаем успешный ответ
      return res.status(204).send("User deleted");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
];