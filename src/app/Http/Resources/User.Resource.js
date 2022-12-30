/*
|--------------------------------------------------------------------------
| Format returned user model data
|--------------------------------------------------------------------------
*/

const assign = require('lodash/assign');
const UserDetailResource = require('./UserDetail.Resource');

module.exports = async (user, dbTransaction = null) => {
  return {
    type: 'user',
    id: user.id,
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
