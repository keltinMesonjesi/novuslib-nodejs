/*
|--------------------------------------------------------------------------
| Quick helper functions for various operations
|--------------------------------------------------------------------------
*/

const toUpper = require('lodash/toUpper');
const replace = require('lodash/replace');
const crypto = require('node:crypto');

/**
 * Generate UUID in uppercase and without dashes
 * @return {*}
 */
const generateUid = () => {
  return toUpper(replace(crypto.randomUUID(), /[-]+/g, ''));
};

module.exports = {
  generateUid,
};
