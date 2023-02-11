/*
|--------------------------------------------------------------------------
| Provides app core services
|--------------------------------------------------------------------------
|
| Here you will find the core functionality provided to the app
|
*/

const { bcrypt, rounds } = require('../../config/hashing');
const { createId } = require('@paralleldrive/cuid2');
const fs = require('fs');

/**
 * Generates application key for encryption and write to .env file
 * @returns String
 */
const generateAppKey = () => {
  const key = bcrypt.hashSync(createId(), bcrypt.genSaltSync(rounds));

  const pathEnv = __dirname + '../../../.env';
  const data = fs.readFileSync(pathEnv, { encoding: 'utf8', flag: 'r' });
  const cursor = data.indexOf('APP_KEY=') + 'APP_KEY='.length;
  const output = data.substring(0, cursor) + key + data.substring(cursor);
  const handle = fs.openSync(pathEnv, 'r+');
  const buffer = Buffer.from(output);
  fs.writeSync(handle, buffer, 0, buffer.length, 0);
  fs.closeSync(handle);

  return key;
};

module.exports = {
  generateAppKey,
};
