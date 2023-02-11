/*
|--------------------------------------------------------------------------
| Provides authentication services
|--------------------------------------------------------------------------
|
| Here you will find the authentication functionality provided to the app
|
*/

const jwt = require('jsonwebtoken');
const moment = require('moment');
const { key } = require('../../config/app');
const { tokensExpiry, tokenTypes } = require('../../config/session');
const { createToken } = require('../Services/token.service');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = key) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user, dbTransaction) => {
  const accessTokenExpires = moment().add(tokensExpiry.access, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(tokensExpiry.refresh, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await createToken(
    {
      token: refreshToken,
      user_id: user.id,
      expires: refreshTokenExpires,
      type: tokenTypes.REFRESH,
    },
    dbTransaction
  );

  return {
    token: {
      access: accessToken,
      refresh: refreshToken,
    },
  };
};

module.exports = {
  generateAuthTokens,
};
