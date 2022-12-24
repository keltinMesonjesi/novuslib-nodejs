/*
|--------------------------------------------------------------------------
| Default Log Channel
|--------------------------------------------------------------------------
|
| This option defines the default log channel that gets used when writing
| messages to the logs. The name specified in this option should match
| one of the channels defined in the "channels" configuration array.
|
*/
const winston = require('winston');
const config = require('./app');

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

module.exports = logging;
