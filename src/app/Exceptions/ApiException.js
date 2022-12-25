class ApiException extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiException;
