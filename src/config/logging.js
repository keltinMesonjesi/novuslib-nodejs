/*
|--------------------------------------------------------------------------
| Logging configurations
|--------------------------------------------------------------------------
|
| Here are defined the logging configurations using winston & morgan packages.
|
*/
const moment = require('moment');
const winston = require('winston');
const morgan = require('morgan');
const config = require('./app');

morgan.token('time', () => {
  return moment().format('HH:mm:ss');
});
morgan.token('message', (req, res) => JSON.stringify(res.locals.errorMessage) || '');

const successResponseFormat = `:time => ":method :url :status - :response-time ms"`;
const errorResponseFormat = `:time => ":method :url :status - :response-time ms" - message: :message`;

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
  errorHandler,
};
