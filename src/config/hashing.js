/*
|--------------------------------------------------------------------------
| Default Hash Driver
|--------------------------------------------------------------------------
|
| This option controls the default hash driver that will be used to hash
| passwords for your application. By default, the bcrypt algorithm is
| used; however, you remain free to modify this option if you wish.
|
*/

const bcrypt = require('bcryptjs');

/**
 * Default salt rounds configuration
 * @type {number}
 */
const BCRYPT_ROUNDS = 10;

module.exports = {
  bcrypt,
  rounds: BCRYPT_ROUNDS,
};
