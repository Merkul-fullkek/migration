const { ValidationError, UserNotFoundError, LoginExistsError } = require('../errors'); // Путь к вашим кастомным ошибкам


class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getAllUsers(req, res, next) {
    try {
      const { status, sort } = req.query;

      // Валидация статуса
      if (status && status !== 'active' && status !== 'inactive') {
        throw new ValidationError('Invalid status value. Must be "active" or "inactive".');
      }

      const users = await this.userService.getAllUsers(status, sort);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { firstName, lastName, middleName, status, login, password } = req.body;

      
      if (!firstName || !lastName || !middleName || !status || !login || !password) {
        throw new ValidationError('All fields are required');
      }

    
      if (status !== 'active' && status !== 'inactive') {
        throw new ValidationError('Invalid status value. Must be "active" or "inactive".');
      }

      const user = await this.userService.createUser({ firstName, lastName, middleName, status, login, password });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const { firstName, status, login, password } = req.body;

      if (!firstName) {
        throw new ValidationError('firstName is required');
      }

      
      if (status && status !== 'active' && status !== 'inactive') {
        throw new ValidationError('Invalid status value. Must be "active" or "inactive".');
      }

      const updatedUser = await this.userService.updateUser(userId, { firstName, status, login, password });
      return res.json(updatedUser);
    } catch (error) {
        next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;
      await this.userService.deleteUser(userId);
      return res.status(204).send();
    } catch (error) {
    next(error);
    }
  }
}

module.exports = UserController;
