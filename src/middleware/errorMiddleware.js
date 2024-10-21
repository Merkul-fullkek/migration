const { ErrorHandler } = require('../errors'); 


function errorHandler(err, req, res, next) {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: err.message });
}

module.exports = errorHandler;