/*
|--------------------------------------------------------------------------
| Provides encryption services
|--------------------------------------------------------------------------
|
| Here you will find the encryption functionality provided to the app
|
*/

const { bcrypt, rounds } = require('../../config/hashing');

/**
 * Password encryption function
 * @param plainPassword
 * @returns {*}
 */
const encryptPassword = (plainPassword) => {
  const salt = bcrypt.genSaltSync(rounds);
  return bcrypt.hashSync(plainPassword, salt);
};

/**
 * Check if same password as encrypted
 * @param plainPassword
 * @param encryptedPassword
 */
const comparePassword = (plainPassword, encryptedPassword) => bcrypt.compareSync(plainPassword, encryptedPassword);

module.exports = {
  encryptPassword,
  comparePassword,
};
