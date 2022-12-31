/*
|--------------------------------------------------------------------------
| Handle token resource services and business logic
|--------------------------------------------------------------------------
*/
const { Token } = require('../Models');

/**
 * Create token record
 * @param fields
 * @param dbTransaction
 * @returns {*}
 */
const create = async (fields, dbTransaction) => {
  return Token.create(
    {
      token: fields.token,
      user_id: fields.user_id,
      expires: fields.expires.toDate(),
      type: fields.type,
      blacklisted: false,
    },
    {
      transaction: dbTransaction,
    }
  );
};

module.exports = {
  createToken: create,
};
