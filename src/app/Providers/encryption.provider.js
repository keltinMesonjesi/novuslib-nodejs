/*
|--------------------------------------------------------------------------
| Provides encryption services
|--------------------------------------------------------------------------
|
| Here you will find the encryption functionality provided to the app
|
*/

const { encryption, encryptionKey, utf8 } = require('../../config/encryption');
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

/**
 * Encrypt plain text data
 * @param {*} plainText
 * @returns
 */
const encrypt = (plainText) => {
  return encryption.encrypt(plainText, encryptionKey).toString();
};

/**
 * Decrypt encrypted text
 * @param {*} cipherText
 * @returns
 */
const decrypt = (cipherText) => {
  return encryption.decrypt(cipherText, encryptionKey).toString(utf8);
};

module.exports = {
  encryptPassword,
  comparePassword,
  encrypt,
  decrypt,
};
