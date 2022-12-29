/*
|--------------------------------------------------------------------------
| Format returned user model data
|--------------------------------------------------------------------------
*/

const UserDetailResource = require('./UserDetail.Resource');

module.exports = async (user) => {
  return {
    type: 'user',
    id: user.id,
    uid: user.uid,
    attributes: {
      username: user.username,
      email: user.email,
      detail: UserDetailResource(await user.getUserDetail()),
    },
  };
};
