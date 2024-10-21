class CustomError extends Error { 
  constructor(code, message) {
    super();
    this.message = message;
    this.statusCode = code;
  }
}


class ValidationError extends CustomError { 
  constructor(message) {
    super();
    
    this.message = message;
    this.statusCode = 400;
  }
}

class UserNotFoundError extends CustomError {
  constructor() {
    super();

    this.message = 'Пользователь не найден';
    this.statusCode = 404;
  }
}

class LoginExistsError extends CustomError {
  constructor() {
    super();
    this.message = 'Пользователь с таким логином уже существует';
    this.statusCode = 400;
  }
}

module.exports = {ValidationError, CustomError, UserNotFoundError, LoginExistsError};