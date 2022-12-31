/*
|--------------------------------------------------------------------------
| Default Session Driver
|--------------------------------------------------------------------------
|
| This option controls the default session "driver" that will be used on
| requests. By default, we will use the lightweight native driver but
| you may specify any of the other wonderful drivers provided here.
|
|
*/

const { envVars } = require('./app');

const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
};

const tokensExpiry = {
  // Number of minutes after which an access token expires
  access: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  // Number of days after which a refresh token expires
  refresh: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  // Number of minutes after which a reset password token expires
  resetPassword: envVars.RESET_PASSWORD_EXPIRATION_MINUTES,
  // Number of minutes after which verify email token expires
  verifyEmail: envVars.VERIFY_EMAIL_EXPIRATION_MINUTES,
};

module.exports = {
  tokenTypes,
  tokensExpiry,
};
