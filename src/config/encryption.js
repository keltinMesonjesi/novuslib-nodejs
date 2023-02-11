/*
|--------------------------------------------------------------------------
| Encrypt/Decrypt configurations
|--------------------------------------------------------------------------
|
| This option controls the default encrypt/decrypt driver that will be used
| to encrypt/decrypt data for your application.
|
*/

const CryptoJS = require('crypto-js');
const { key } = require('./app');

/**
 * Default encryption algorithm configuration
 * @type {string}
 */
const algorithm = 'AES';

module.exports = {
  encryption: CryptoJS[algorithm],
  encryptionKey: key,
  utf8: CryptoJS.enc.Utf8,
};
