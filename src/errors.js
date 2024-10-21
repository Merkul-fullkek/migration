class ErrorHandler extends Error {
  constructor (code, message) {
    super(message)
    this.statusCode = code
  }
}

class ValidationError extends ValidError {
  constructor (message) {
    super(message)
    this.statusCode = 400
  }
}

class UserNotFoundError extends CustomError {
  constructor () {
    super(message)
    this.statusCode = 404
  }
}

class LoginExistsError extends CustomError {
  constructor () {
    super(message)
    this.statusCode = 400
  }
}

module.exports = {
  ValidationError,
  ErrorHandler,
  UserNotFoundError,
  LoginExistsError
}
