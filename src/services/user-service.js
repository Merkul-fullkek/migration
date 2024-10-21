const { User, Authenticate } = require('../models')
const { UserNotFoundError, LoginExistsError } = require('../errors') // Путь к вашим кастомным ошибкам
const crypto = require('crypto')
const PublicUser = require('../public-user')

class UserService {
  async getAllUsers (status, sort) {
    const whereFilter = {}
    if (status) {
      whereFilter.status = status
    }

    const orderAlph =
      sort === 'ASC'
        ? [['firstName', 'ASC']]
        : sort === 'DESC'
        ? [['firstName', 'DESC']]
        : []

    const users = await User.findAll({
      where: whereFilter,
      order: orderAlph,
      include: [
        {
          model: Authenticate,
          as: 'authentications'
        }
      ]
    })

    return users.map(user => new PublicUser(user))
  }

  async createUser (userData) {
    const { firstName, lastName, middleName, status, login, password } =
      userData

    const existingAuthenticate = await Authenticate.findOne({
      where: { login }
    })
    if (existingAuthenticate) {
      throw new LoginExistsError()
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex')

    const user = await User.create(
      {
        firstName,
        lastName,
        middleName,
        status,
        Authentications: {
          login,
          password: hashedPassword
        }
      },
      {
        include: [{ model: Authenticate, as: 'authentications' }]
      }
    )

    return new PublicUser(user)
  }

  async updateUser (userId, userData) {
    const { firstName, status, login, password } = userData

    const user = await User.findOne({
      where: { id: user_id },
      include: [{ model: Authenticate, as: 'authentications' }]
    })

    if (!user) throw new UserNotFoundError()

    user.firstName = firstName
    user.status = status

    if (userData.login !== undefined && userData.password !== undefined) {
      user.Authentications.password = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')
    }

    await user.save()

    return new PublicUser(user)
  }

  async deleteUser (userId) {
    const deletedUser = await User.destroy({
      where: { id: userId }
    })

    if (!deletedUser) {
      throw new UserNotFoundError()
    }

    return deletedUser
  }
}

module.exports = UserService
