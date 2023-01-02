/**
 * Handles errors & exceptions
 */
const httpStatus = require('http-status');
const config = require('../../config/app');
const { logging } = require('../../config/logging');
const ApiException = require('./ApiException');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiException)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiException(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.debug === 'false') {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'An error has occurred';
  }

  res.locals.errorMessage = err.message;

  const response = {
    status: 'failed',
    message,
    ...(config.debug === 'true' && { stack: err.stack }),
  };

  if (config.debug === 'true') {
    logging.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
