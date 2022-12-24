/*
|--------------------------------------------------------------------------
| Logging configurations
|--------------------------------------------------------------------------
|
| Here are defined the logging configurations using winston & morgan packages.
|
*/
const winston = require('winston');
const morgan = require('morgan');
const config = require('./app');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const successResponseFormat = `[:date[web]] ":method :url :status - :response-time ms"`;
const errorResponseFormat = `[:date[web]] ":method :url :status - :response-time ms" - message: :message`;

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logging = winston.createLogger({
  level: config.debug === 'true' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.debug === 'true' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logging.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logging.error(message.trim()) },
});

module.exports = {
  logging,
  successHandler,
  errorHandler
};
