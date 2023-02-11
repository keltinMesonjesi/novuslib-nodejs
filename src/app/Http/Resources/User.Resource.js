/*
|--------------------------------------------------------------------------
| Format returned user model data
|--------------------------------------------------------------------------
*/

const assign = require('lodash/assign');
const { encrypt } = require('../../Providers/encryption.provider');
const UserDetailResource = require('./UserDetail.Resource');

module.exports = async (user, dbTransaction = null) => {
  return {
    type: 'user',
    id: encrypt(user.id.toString()),
    uid: user.uid,
    attributes: {
      username: user.username,
      email: user.email,
      detail: UserDetailResource(
        await user.getUserDetail(assign({}, dbTransaction !== null ? { transaction: dbTransaction } : {}))
      ),
    },
  };
};
