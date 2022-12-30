/*
|--------------------------------------------------------------------------
| Handle user resource services and business logic
|--------------------------------------------------------------------------
*/
const { User } = require('../Models');
const { UserDetail } = require('../Models');
const { generateUid } = require('../Utility/helper.utility');
const { encryptPassword } = require('../Providers/encryption.provider');

/**
 * Create user record together with user detail record
 * @param fields
 * @param dbTransaction
 * @returns {*}
 */
const create = async (fields, dbTransaction) => {
  const user = await User.create(
    {
      uid: generateUid(),
      username: fields.username,
      email: fields.email,
      password: encryptPassword(fields.password),
    },
    {
      transaction: dbTransaction,
    }
  );

  await UserDetail.create(
    {
      user_id: user.id,
      firstname: fields.firstname,
      lastname: fields.lastname,
      phone_number: fields.phone_number,
      address: fields.address,
    },
    {
      transaction: dbTransaction,
    }
  );

  return user;
};

module.exports = {
  createUser: create,
};
