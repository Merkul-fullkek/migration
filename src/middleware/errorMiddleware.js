const { ValidationError, UserNotFoundError, InternalError, CustomError } = require('../errors'); 


function errorHandler(err, req, res, next) {


  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof UserNotFoundError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
}
module.exports = errorHandler;