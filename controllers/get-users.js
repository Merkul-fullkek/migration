const { User, Authenticate } = require('../models');
const auth = require('../middleware/authMiddleware');

exports.getAllUsers = [
  auth, // Добавляем middleware для Basic Auth
  async (req, res) => {
    try {
      const { status, sort } = req.query;

      // Проверяем, что статус является допустимым значением
      if (status && status !== 'active' && status !== 'inactive') {
        return res.status(400).json({ error: 'Invalid status value. Must be "active" or "inactive".' });
      }

      // Фильтр для запроса
      let whereFilter = {};
      if (status) {
        whereFilter.status = status;
      }

      // Сортировка по имени
      let orderAlph = [];
      if (sort === 'ASC') {
        orderAlph.push(['firstName', 'ASC']);
      } else if (sort === 'DESC') {
        orderAlph.push(['firstName', 'DESC']);
      }

      // Получаем всех пользователей с учетом фильтра и сортировки, включая связанные записи аутентификации
      const users = await User.findAll({
        where: whereFilter,
        order: orderAlph,
        include: [{ model: Authenticate, as: 'Authentications' }] // Включаем связанные записи аутентификации
      });

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];