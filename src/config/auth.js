/*
|--------------------------------------------------------------------------
| Authentication Defaults
|--------------------------------------------------------------------------
|
| This option controls the default authentication "guard" and password
| reset options for your application. You may change these defaults
| as required, but they're a perfect start for most applications.
|
*/

const auth = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { key } = require('./app');
const { tokenTypes } = require('./session');
const { getUserById } = require('../app/Queries/user.query');

/*
|--------------------------------------------------------------------------
| JWT strategy configuration
|--------------------------------------------------------------------------
*/
const jwtOptions = {
  secretOrKey: key,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await getUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  auth,
  jwtStrategy,
};
