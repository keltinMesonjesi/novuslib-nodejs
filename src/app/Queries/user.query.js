/*
|--------------------------------------------------------------------------
| Handle user resource queries
|--------------------------------------------------------------------------
*/

const { User } = require('../Models');

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findByPk(id);
};

module.exports = {
  getUserById,
};
