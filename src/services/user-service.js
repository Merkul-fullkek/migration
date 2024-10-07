const { User, Authenticate } = require('../models');
const bcrypt = require('bcrypt');
const { ValidationError } = require('sequelize');


class UserService {
  static async getAllUsers(status, sort) {
    try {
      // Проверяем, что статус является допустимым значением
      if (status && status !== 'active' && status !== 'inactive') {
        throw new ValidationError('Invalid status value. Must be "active" or "inactive".');
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

      return users;
    } catch (error) {
      throw error;
    }
  }

 static async createUser(userData) {
    try {
      const { firstName, lastName, middleName, status, login, password } = userData;

      // Проверяем, что все необходимые поля присутствуют
      if (!firstName || !lastName || !middleName || !status || !login || !password) {
        throw new ValidationError('All fields are required');
      }

      // Проверяем, что модели определены
      if (!User || !Authenticate) {
        throw new Error('Models are not defined');
      }

      // Проверяем, существует ли уже такой логин
      const existingAuthenticate = await Authenticate.findOne({ where: { login } });
      if (existingAuthenticate) {
        throw new ValidationError('Login already exists');
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

      return user;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ValidationError('Unique constraint error: login already exists');
      } else {
        throw error;
      }
    }
  }


  static async updateUser(userId, userData) {
    try {
      const { firstName, status, login, password } = userData;

      // Проверяем, что firstName присутствует
      if (!firstName) {
        throw new ValidationError('firstName is required');
      }

      // Проверяем, что статус является допустимым значением
      if (status && status !== 'active' && status !== 'inactive') {
        throw new ValidationError('Invalid status value. Must be "active" or "inactive".');
      }

      // Находим пользователя по id
      const user = await User.findOne({ where: { id: userId } });

      // Если пользователь не найден, возвращаем ошибку
      if (!user) {
        throw new Error('User not found!');
      }

      // Обновляем поля пользователя
      user.firstName = firstName;
      user.status = status;

      // Обновляем связанную запись аутентификации
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
        where: { id: userId },
        include: [{ model: Authenticate, as: 'Authentications' }]
      });

      // Возвращаем обновленного пользователя
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }


static async deleteUser(userId) {
    try {
      // Удаляем связанную запись аутентификации
      const deletedAuthenticate = await Authenticate.destroy({
        where: { UserId: userId }
      });

      // Удаляем пользователя
      const deletedUser = await User.destroy({
        where: { id: userId }
      });

      // Если пользователь не найден, возвращаем ошибку
      if (!deletedUser) {
        throw new Error('User not found');
      }

      // Возвращаем успешный ответ
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}


module.exports = UserService;